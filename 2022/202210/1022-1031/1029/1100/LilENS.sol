pragma solidity ^0.8.10;

//LilENSとは、ENSの子ドメインを管理するためのコントラクトです。
contract LilENS {
   error Unauthorized();

	error AlreadyRegistered();

	mapping(string => address) public lookup;

   //registerとは、子ドメインを登録するための関数です。
   function register(string memory name) public payable {
		if (lookup[name] != address(0)) revert AlreadyRegistered();

		lookup[name] = msg.sender;
	}

   //updateとは、子ドメインの所有者を変更するための関数です。
   function update(string memory name, address newOwner) public {
      if (lookup[name] != msg.sender) revert Unauthorized();
   }
}