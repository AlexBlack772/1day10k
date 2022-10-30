//Ownableとは、コントラクトの所有者を管理するためのライブラリ
Ownable　ownable;
//onlyOwner()とは、所有者のみが実行できる関数
onlyOwner()　onlyOwner;
//renounceOwnership()とは、所有権の放棄のこと
renounceOwnership()　renounceOwnership;
//transferOwnership()とは、所有権の移転のこと
transferOwnership(address newOwner)　transferOwnership;
//grantRole(role, account)とは、アカウントにロールを付与する
grantRole(bytes32 role, address account)　grantRole;
//revokeRole(role, account)とは、アカウントからロールを剥奪する
revokeRole(bytes32 role, address account)　revokeRole;
//renounceRole(role, account)とは、アカウントからロールを放棄する
renounceRole(bytes32 role, address account)　renounceRole;
//hasRole(role, account)とは、アカウントがロールを持っているかどうかを確認する
hasRole(bytes32 role, address account)　hasRole;
//getRoleAdmin(role)とは、ロールの管理者を取得する
getRoleAdmin(bytes32 role)　getRoleAdmin;
//grantRole(role, account)とは、アカウントにロールを付与する
grantRole(bytes32 role, address account)　grantRole;
//supportsInterface(interfaceId)とは、インターフェースをサポートしているかどうかを確認する
supportsInterface(bytes4 interfaceId)　supportsInterface;
