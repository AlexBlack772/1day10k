package context.go func() {
	
}()

//context とは、
type Context struct {
	baseCtx       context.Context
	ms            MultiStore
	header        tmproto.Header
	headerHash    tmbytes.HexBytes
	chainID       string
	txBytes       []byte
	logger        log.Logger
	voteInfo      []abci.VoteInfo
	gasMeter      GasMeter
	blockGasMeter GasMeter
	checkTx       bool
	recheckTx     bool // if recheckTx == true, then checkTx must also be true
	minGasPrice   DecCoins
	consParams    *abci.ConsensusParams
	eventManager  *EventManager
	priority      int64 // The tx priority, only relevant in CheckTx
}