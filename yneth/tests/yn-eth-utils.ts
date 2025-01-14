import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  Deposit,
  DepositETHPausedUpdated,
  ETHWithdrawn,
  Initialized,
  PauseWhitelistUpdated,
  RewardsReceived,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  TransfersUnpaused,
  WithdrawnETHProcessed
} from "../generated/ynETH/ynETH"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createDepositEvent(
  sender: Address,
  receiver: Address,
  assets: BigInt,
  shares: BigInt,
  totalDepositedInPool: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "totalDepositedInPool",
      ethereum.Value.fromUnsignedBigInt(totalDepositedInPool)
    )
  )

  return depositEvent
}

export function createDepositETHPausedUpdatedEvent(
  isPaused: boolean
): DepositETHPausedUpdated {
  let depositEthPausedUpdatedEvent =
    changetype<DepositETHPausedUpdated>(newMockEvent())

  depositEthPausedUpdatedEvent.parameters = new Array()

  depositEthPausedUpdatedEvent.parameters.push(
    new ethereum.EventParam("isPaused", ethereum.Value.fromBoolean(isPaused))
  )

  return depositEthPausedUpdatedEvent
}

export function createETHWithdrawnEvent(
  ethAmount: BigInt,
  totalDepositedInPool: BigInt
): ETHWithdrawn {
  let ethWithdrawnEvent = changetype<ETHWithdrawn>(newMockEvent())

  ethWithdrawnEvent.parameters = new Array()

  ethWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "ethAmount",
      ethereum.Value.fromUnsignedBigInt(ethAmount)
    )
  )
  ethWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "totalDepositedInPool",
      ethereum.Value.fromUnsignedBigInt(totalDepositedInPool)
    )
  )

  return ethWithdrawnEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createPauseWhitelistUpdatedEvent(
  account: Address,
  isWhitelisted: boolean
): PauseWhitelistUpdated {
  let pauseWhitelistUpdatedEvent =
    changetype<PauseWhitelistUpdated>(newMockEvent())

  pauseWhitelistUpdatedEvent.parameters = new Array()

  pauseWhitelistUpdatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  pauseWhitelistUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isWhitelisted",
      ethereum.Value.fromBoolean(isWhitelisted)
    )
  )

  return pauseWhitelistUpdatedEvent
}

export function createRewardsReceivedEvent(
  value: BigInt,
  totalDepositedInPool: BigInt
): RewardsReceived {
  let rewardsReceivedEvent = changetype<RewardsReceived>(newMockEvent())

  rewardsReceivedEvent.parameters = new Array()

  rewardsReceivedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  rewardsReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "totalDepositedInPool",
      ethereum.Value.fromUnsignedBigInt(totalDepositedInPool)
    )
  )

  return rewardsReceivedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createTransfersUnpausedEvent(): TransfersUnpaused {
  let transfersUnpausedEvent = changetype<TransfersUnpaused>(newMockEvent())

  transfersUnpausedEvent.parameters = new Array()

  return transfersUnpausedEvent
}

export function createWithdrawnETHProcessedEvent(
  ethAmount: BigInt,
  totalDepositedInPool: BigInt
): WithdrawnETHProcessed {
  let withdrawnEthProcessedEvent =
    changetype<WithdrawnETHProcessed>(newMockEvent())

  withdrawnEthProcessedEvent.parameters = new Array()

  withdrawnEthProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "ethAmount",
      ethereum.Value.fromUnsignedBigInt(ethAmount)
    )
  )
  withdrawnEthProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "totalDepositedInPool",
      ethereum.Value.fromUnsignedBigInt(totalDepositedInPool)
    )
  )

  return withdrawnEthProcessedEvent
}
