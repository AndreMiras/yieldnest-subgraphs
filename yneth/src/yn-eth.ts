import {
  Approval as ApprovalEvent,
  Deposit as DepositEvent,
  DepositETHPausedUpdated as DepositETHPausedUpdatedEvent,
  ETHWithdrawn as ETHWithdrawnEvent,
  Initialized as InitializedEvent,
  PauseWhitelistUpdated as PauseWhitelistUpdatedEvent,
  RewardsReceived as RewardsReceivedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  TransfersUnpaused as TransfersUnpausedEvent,
  WithdrawnETHProcessed as WithdrawnETHProcessedEvent
} from "../generated/ynETH/ynETH"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.assets = event.params.assets
  entity.shares = event.params.shares
  entity.totalDepositedInPool = event.params.totalDepositedInPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDepositETHPausedUpdated(
  event: DepositETHPausedUpdatedEvent
): void {
  let entity = new DepositETHPausedUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.isPaused = event.params.isPaused

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleETHWithdrawn(event: ETHWithdrawnEvent): void {
  let entity = new ETHWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ethAmount = event.params.ethAmount
  entity.totalDepositedInPool = event.params.totalDepositedInPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePauseWhitelistUpdated(
  event: PauseWhitelistUpdatedEvent
): void {
  let entity = new PauseWhitelistUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.isWhitelisted = event.params.isWhitelisted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsReceived(event: RewardsReceivedEvent): void {
  let entity = new RewardsReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value
  entity.totalDepositedInPool = event.params.totalDepositedInPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfersUnpaused(event: TransfersUnpausedEvent): void {
  let entity = new TransfersUnpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawnETHProcessed(
  event: WithdrawnETHProcessedEvent
): void {
  let entity = new WithdrawnETHProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ethAmount = event.params.ethAmount
  entity.totalDepositedInPool = event.params.totalDepositedInPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
