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
//