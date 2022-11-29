//Crate frame_benchmarkingとは、フレームワークのベンチマークを実行するためのツールです。
//Crate pallet_mmrとは、Merkle Mountain Rangeを実装するためのパレットです。
Crate pallet_mmr
//Mountainとは、山のことです。
//frame_support::pallet_prelude::*とは、パレットのための共通のモジュールを提供します。
use frame_support::pallet_prelude::*;
//frame_executiveとは、フレームワークの実行を管理するためのモジュールです。
use frame_executive::ExecuteBlock;
//frame_supportとは、フレームワークのサポートを提供するためのモジュールです。
use frame_support::traits::GenesisBuild;
//frame_systemとは、フレームワークのシステムを管理するためのモジュールです。
use frame_system::RawOrigin;
//sp_runtimeとは、フレームワークのランタイムを管理するためのモジュールです。
use sp_runtime::traits::BlakeTwo256;
//sp_runtime::testingとは、フレームワークのランタイムのテストを管理するためのモジュールです。
use sp_runtime::testing::Header;
//sp_coreとは、フレームワークのコアを管理するためのモジュールです。
use sp_core::H256;
//sp_ioとは、フレームワークのI/Oを管理するためのモジュールです。
use sp_io::TestExternalities;
//sp_runtime::traits::IdentityLookupとは、フレームワークのランタイムのトレイトを管理するためのモジュールです。
use sp_runtime::traits::IdentityLookup;
//node_template_runtimeとは、フレームワークのランタイムを管理するためのモジュールです。
use node_template_runtime::*;
//node_executorとは、ノードを実行するためのモジュールです。
use node_executor::Executor;
//node_inspectとは、ノードを検査するためのモジュールです。
use node_inspect::NodeTemplateRuntimeApi;
//pallet_democracyとは、民主主義を実装するためのパレットです。
use pallet_democracy::Call as DemocracyCall;
//pallet_balancesとは、残高を実装するためのパレットです。
use pallet_balances
//pallet_collectiveとは、集団を実装するためのパレットです。
use pallet_collective
//pallet_membershipとは、メンバーシップを実装するためのパレットです。
use pallet_membership
//pallet_sudoとは、sudoを実装するためのパレットです。
use pallet_sudo
//pallet_timestampとは、タイムスタンプを実装するためのパレットです。
use pallet_timestamp
//pallet_utilityとは、ユーティリティを実装するためのパレットです。
use pallet_utility
//pallet_transaction_paymentとは、トランザクションの支払いを実装するためのパレットです。
use pallet_transaction_payment
//pallet_authorshipとは、著作権を実装するためのパレットです。
use pallet_authorship
//pallet_sessionとは、セッションを実装するためのパレットです。
use pallet_session
//pallet_grandpaとは、グランドパを実装するためのパレットです。
use pallet_grandpa
//グランドパとは、グランドパのことです。
//pallet_im_onlineとは、オンラインを実装するためのパレットです。
use pallet_im_online
//pallet_offencesとは、犯罪を実装するためのパレットです。
use pallet_offences
//pallet_authority_discoveryとは、権限の発見を実装するためのパレットです。
use pallet_authority_discovery
//pallet_stakingとは、ステーキングを実装するためのパレットです。
use pallet_staking
//pallet_treasuryとは、財政を実装するためのパレットです。
use pallet_treasury
//pallet_contractsとは、契約を実装するためのパレットです。
use pallet_contracts
//pallet_sudoとは、sudoを実装するためのパレットです。
use pallet_sudo
//pallet_babeとは、Babeを実装するためのパレットです。
use pallet_babe
//pallet_indicesとは、インデックスを実装するためのパレットです。
use pallet_indices
//pallet_transaction_paymentとは、トランザクションの支払いを実装するためのパレットです。
use pallet_transaction_payment
//pallet_giltとは、Giltを実装するためのパレットです。
use pallet_gilt
//pallet_elections_phragmenとは、選挙を実装するためのパレットです。
use pallet_elections_phragmen
//pallet_ranked_collectiveとは、ランク付き集団を実装するためのパレットです。
use pallet_ranked_collective
//pallet_proxyとは、プロキシを実装するためのパレットです。
use pallet_proxy
//pallet_multisigとは、マルチシグを実装するためのパレットです。
use pallet_multisig
//phragmen_pirとは、フラグメンピアを実装するためのパレットです。
use phragmen_pir
//sc_network_gossipとは、ネットワークのゴシップを実装するためのパレットです。
use sc_network_gossip
//sc_finality_grandpaとは、グランドパの最終性を実装するためのパレットです。
use sc_finality_grandpa
//sc_network_syncとは、ネットワークの同期を実装するためのパレットです。
use sc_network_sync
//sc_state_dbとは、ステートのデータベースを実装するためのパレットです。
use sc_state_db
//sc_consensus_babeとは、Babeの合意を実装するためのパレットです。
use sc_consensus_babe
//sp_keystoreとは、キーストアを実装するためのパレットです。
use sp_keystore
//sp_offchainとは、オフチェーンを実装するためのパレットです。
use sp_offchain
//sp_transaction_poolとは、トランザクションプールを実装するためのパレットです。
use sp_transaction_pool
//sp_consensus_babeとは、Babeの合意を実装するためのパレットです。
use sp_consensus_babe
//sp_panic_handlerとは、パニックハンドラーを実装するためのパレットです。
use sp_panic_handler
//パニックハンドラーとは、パニックを実装するためのパレットです。
//sp_timestampとは、タイムスタンプを実装するためのパレットです。
use sp_timestamp
//sp_serializerとは、シリアライザーを実装するためのパレットです。
use sp_serializer
//sp_tracingとは、トレーシングを実装するためのパレットです。
use sp_tracing
//sp_inherentsとは、インヘリタンスを実装するためのパレットです。
use sp_inherents
//sp_consensusとは、合意を実装するためのパレットです。
use sp_consensus
//sp_consensus_auraとは、Auraの合意を実装するためのパレットです。
use sp_consensus_aura
//substrate_frame_cliとは、フレームのCLIを実装するためのパレットです。
use substrate_frame_cli
//sp_wasm_interfaceとは、Wasmのインターフェースを実装するためのパレットです。
use sp_wasm_interface
//sp_trieとは、トライを実装するためのパレットです。
use sp_trie
//sp_state_machineとは、ステートマシンを実装するためのパレットです。
use sp_state_machine
//sp_sanboxとは、サンドボックスを実装するためのパレットです。
use sp_sandbox
//sp_runtimeとは、ランタイムを実装するためのパレットです。
use sp_runtime
//sp_stakeingとは、ステーキングを実装するためのパレットです。
pub trait OnStakerSlash<AccountId, Balance> {
    fn on_slash(
        stash: &AccountId,
        slashed_active: Balance,
        slashed_unlocking: &BTreeMap<EraIndex, Balance>
    );
}
//OnStakerSlashとは、ステーカーのスラッシュを実装するためのパレットです。
//pub use self::dispatch::Callable
pub use self::dispatch::Callable;
//Callableとは、コール可能を実装するためのパレットです。
//pub use self::dispatch::Parameter;
pub use self::dispatch::Parameter;
//Parameterとは、パラメーターを実装するためのパレットです。
//pub use self::storage::StorageMap;
pub use self::storage::StorageMap;
//StorageMapとは、ストレージマップを実装するためのパレットです。
//Module frame_support::dispatch
Module frame_support::dispatch
//Module frame_support::storageとは、ストレージを実装するためのパレットです。
Module frame_support::storage
//Module frame_support::traitsとは、トレイトを実装するためのパレットです。
Module frame_support::traits
//「A pallet for atomically sending funds from an origin to a target. A proof is used to allow the target to approve (claim) the swap. If the swap is not claimed within a specified duration of time, the sender may cancel it.」とは、オリジンからターゲットにファンドをアトミックに送信するためのパレットです。証明書を使用して、ターゲットがスワップを承認（請求）できるようにします。スワップが指定された時間内に請求されない場合、送信者はキャンセルできます。
//pallet_atomic_swapとは、アトミックスワップを実装するためのパレットです。
//fixed_pointとは、固定小数点を実装するためのパレットです。
use fixed_point
//pallet_balancesとは、バランスを実装するためのパレットです。

