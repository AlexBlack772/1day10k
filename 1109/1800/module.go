//AppMOduleBasicとは、AppModuleのインターフェースを実装した構造体
type AppModuleBasic interface {
	Name() string
	RegisterLegacyAminoCodec(*codec.LegacyAmino)
	RegisterInterfaces(codectypes.InterfaceRegistry)

	DefaultGenesis(codec.JSONCodec) json.RawMessage
	ValidateGenesis(codec.JSONCodec, client.TxEncodingConfig, json.RawMessage) error

	// client functionality
	RegisterGRPCGatewayRoutes(client.Context, *runtime.ServeMux)
	GetTxCmd() *cobra.Command
	GetQueryCmd() *cobra.Command
}

//AppModuleGenesisとは、
type AppModuleGenesis interface {
	AppModuleBasic

	InitGenesis(sdk.Context, codec.JSONCodec, json.RawMessage) []abci.ValidatorUpdate
	ExportGenesis(sdk.Context, codec.JSONCodec) json.RawMessage
}

type AppModule interface {
	AppModuleBasic
	
	// RegisterInvariants registers the module invariants.
	RegisterInvariants(ir sdk.InvariantRegistry)
	Route() sdk.Route

	// Deprecated: use RegisterServices
	QuerierRoute() string

	// Deprecated: use RegisterServices
	LegacyQuerierHandler(*codec.LegacyAmino) sdk.Querier

	// RegisterServices allows a module to register services
	RegisterServices(Configurator)

	// ConsensusVersion is a sequence number for state-breaking change of the
	// module. It should be incremented on each consensus-breaking change
	// introduced by the module. To avoid wrong/empty versions, the initial version
	// should be set to 1.
	ConsensusVersion() uint64
}

// BeginBlockAppModule is an extension interface that contains information about the AppModule and BeginBlock.
//beginBlockAppModuleとは、
type BeginBlockAppModule interface {
	AppModule
}