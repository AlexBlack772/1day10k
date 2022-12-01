pragma solidity ^0.8.10;

//LilOpenSeaとは、OpenSeaのようなNFTマーケットプレイスを作るためのコントラクトです。
contract LilOpenSea {
   error Unauthorized();

   //WrongValueSentとは、送金された値が正しくないときに発生します。
	error WrongValueSent();

   //ListingNotFoundは、リストが見つからなかったときに発生します。
	error ListingNotFound();

   //NewListingとは、新しいリストが作成されたときに発生します。
	event NewListing(Listing listing);

	event ListingRemoved(Listing listing);

	event ListingBought(address indexed buyer, Listing listing);

	uint256 internal saleCounter = 1;

   //Listingとは、NFTのリストを表します。
	struct Listing {
		ERC721 tokenContract;
		uint256 tokenId;
		address creator;
		uint256 askPrice;
	}

	mapping(uint256 => Listing) public getListing;

   //listとは、NFTをリストに追加するための関数です。
   function list(
      ERC721 tokenContract,
      uint256 tokenId,
      uint256 askPrice
   ) external {
      unchecked {
         require(
            tokenContract.ownerOf(tokenId) == msg.sender,
            'Unauthorized'
         );
         require(
            tokenContract.getApproved(tokenId) == address(this),
            'Unauthorized'
         );
         require(
            tokenContract.isApprovedForAll(msg.sender, address(this)),
            'Unauthorized'
         );
         require(
            askPrice > 0,
            'WrongValueSent'
         );
         getListing[saleCounter] = Listing(
            tokenContract,
            tokenId,
            msg.sender,
            askPrice
         );
         emit NewListing(getListing[saleCounter]);
         saleCounter++;
      }
   }

   //cancelListingとは、リストを削除するための関数です。
   function cancelListing(uint256 listingId) external {
      unchecked {
         require(
            getListing[listingId].creator == msg.sender,
            'Unauthorized'
         );
         emit ListingRemoved(getListing[listingId]);
         delete getListing[listingId];
      }
   }

   //buyListingとは、リストを購入するための関数です。
   function buyListing(uint256 listingId) external payable {
      unchecked {
         require(
            getListing[listingId].askPrice == msg.value,
            'WrongValueSent'
         );
         require(
            getListing[listingId].creator != msg.sender,
            'Unauthorized'
         );
         getListing[listingId].tokenContract.transferFrom(
            getListing[listingId].creator,
            msg.sender,
            getListing[listingId].tokenId
         );
         payable(getListing[listingId].creator).transfer(msg.value);
         emit ListingBought(msg.sender, getListing[listingId]);
         delete getListing[listingId];
      }
   }
   


}