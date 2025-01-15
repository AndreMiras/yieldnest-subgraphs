/**
 * Extended event handling for the ynETH contract with added metrics tracking.
 *
 * This module was introduced to extend the functionality of scaffolded handlers
 * in `yn-eth.ts` without modifying the original file. It wraps the original
 * handlers to preserve their logic while adding the capability to track and store
 * additional metrics for historical analysis.
 *
 * Metrics tracked include:
 * - `totalSupply`, `totalAssets`, `totalDepositedInPool`
 * - `exchangeRate` (shares to assets)
 * - `marketShare` (assets-to-supply ratio)
 *
 * Each event handler calls the original handler and then creates a
 * `MetricsSnapshot` entity to store the extended data. This approach maintains
 * compatibility with generated code while enhancing its functionality.
 */
import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  Deposit as DepositEvent,
  ETHWithdrawn as ETHWithdrawnEvent,
  RewardsReceived as RewardsReceivedEvent,
  WithdrawnETHProcessed as WithdrawnETHProcessedEvent,
  ynETH,
} from "../generated/ynETH/ynETH";
import { MetricsSnapshot } from "../generated/schema";
import {
  handleDeposit as handleDepositOriginal,
  handleETHWithdrawn as handleETHWithdrawnOriginal,
  handleRewardsReceived as handleRewardsReceivedOriginal,
  handleWithdrawnETHProcessed as handleWithdrawnETHProcessedOriginal,
} from "./yn-eth";

// Helper for BigInt to BigDecimal conversion with 18 decimals
function toBigDecimal(value: BigInt): BigDecimal {
  const decimals = BigInt.fromI32(18);
  const divisor = BigInt.fromI32(10).pow(decimals.toI32() as u8);
  return value.toBigDecimal().div(divisor.toBigDecimal());
}

/**
 * Fallback implementation for previewRedeem.
 *
 * This function calculates the redeem value of shares based on the total assets
 * and total supply of the contract. It is used when the `previewRedeem` view
 * function is not implemented in older contract versions or when it reverts.
 *
 * The fallback logic ensures that even if the contract does not provide a direct
 * preview mechanism, we can derive the equivalent redeem value for a given number
 * of shares.
 *
 * This allows the subgraph to maintain compatibility with both legacy and modern
 * contract implementations.
 *
 * @param shares - The number of shares to calculate the redeem value for.
 * @param totalAssets - The total assets of the contract.
 * @param totalSupply - The total supply of shares in the contract.
 * @returns The redeem value of the provided shares.
 */
function previewRedeemFallback(
  shares: BigInt,
  totalAssets: BigInt,
  totalSupply: BigInt,
): BigInt {
  if (totalSupply.isZero()) {
    return shares;
  }
  return shares.times(totalAssets).div(totalSupply);
}

function createMetricsSnapshot(event: ethereum.Event): MetricsSnapshot {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  let snapshot = new MetricsSnapshot(id);

  // Get contract instance to call view functions
  const contract = ynETH.bind(event.address);

  // Get core metrics
  const totalSupply = contract.totalSupply();
  const totalAssets = contract.totalAssets();
  const totalDepositedInPool = contract.totalDepositedInPool();

  let ethValue: BigInt;
  const oneEther = BigInt.fromI32(10).pow(18);
  // Calculate exchange rate by checking previewRedeem for 1 ether worth of shares
  const tryPreview = contract.try_previewRedeem(oneEther);
  if (tryPreview.reverted) {
    ethValue = previewRedeemFallback(oneEther, totalAssets, totalSupply);
  } else {
    // Use on-chain previewRedeem if available
    ethValue = tryPreview.value;
  }

  // Store all metrics
  snapshot.totalSupply = toBigDecimal(totalSupply);
  snapshot.totalAssets = toBigDecimal(totalAssets);
  snapshot.totalDepositedInPool = toBigDecimal(totalDepositedInPool);
  snapshot.exchangeRate = toBigDecimal(ethValue);

  // Market share = (totalAssets / totalSupply) when totalSupply > 0
  if (totalSupply > BigInt.fromI32(0)) {
    snapshot.marketShare = toBigDecimal(totalAssets).div(
      toBigDecimal(totalSupply),
    );
  } else {
    snapshot.marketShare = BigDecimal.fromString("1.0");
  }

  // Metadata
  snapshot.timestamp = event.block.timestamp;
  snapshot.blockNumber = event.block.number;
  snapshot.transactionHash = event.transaction.hash;

  return snapshot;
}

export function handleDeposit(event: DepositEvent): void {
  handleDepositOriginal(event);
  const snapshot = createMetricsSnapshot(event);
  snapshot.trigger = "Deposit";
  snapshot.save();
}

export function handleRewardsReceived(event: RewardsReceivedEvent): void {
  handleRewardsReceivedOriginal(event);
  const snapshot = createMetricsSnapshot(event);
  snapshot.trigger = "RewardsReceived";
  snapshot.save();
}

export function handleETHWithdrawn(event: ETHWithdrawnEvent): void {
  handleETHWithdrawnOriginal(event);
  const snapshot = createMetricsSnapshot(event);
  snapshot.trigger = "ETHWithdrawn";
  snapshot.save();
}

export function handleWithdrawnETHProcessed(
  event: WithdrawnETHProcessedEvent,
): void {
  handleWithdrawnETHProcessedOriginal(event);
  const snapshot = createMetricsSnapshot(event);
  snapshot.trigger = "WithdrawnETHProcessed";
  snapshot.save();
}
