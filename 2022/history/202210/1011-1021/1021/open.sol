//receive()とは、payableな関数である。payableな関数は、etherを受け取ることができる。
//receive()は、etherを受け取るときに呼び出される関数である。
//receive()は、payableな関数である。
//totalShares()
//openzepplinのERC20.solのtotalSupply()と同じである。
//totalShares()は、ERC20.solのtotalSupply()と同じである。
totalShares() public view returns (uint256) {
    return totalShares;
}
//totalValue()
//totalValue()は、totalShares()と同じである。
totalValue() public view returns (uint256) {
    return totalShares;
}
//IAccessControlとは、アクセスコントロールのこと
IAccessControl public accessControl;
//transferOwnership()とは、所有権の移転のこと
transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
}
//mintMinerReward()とは、マイナーの報酬のこと
mintMinerReward(address miner, uint256 amount) public onlyOwner {
    _mint(miner, amount);
}
//PaymentSplitterとは、支払い分割のこと
PaymentSplitter public paymentSplitter;
//setPaymentSplitter()とは、支払い分割の設定のこと
setPaymentSplitter(address newPaymentSplitter) public onlyOwner {
    paymentSplitter = PaymentSplitter(newPaymentSplitter);
}
