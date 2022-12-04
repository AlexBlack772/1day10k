import chai from 'chai';
import ethers from 'ethers';

descrtibe('Senpuuki', function () {
   beforeEach('should be deployed', async function () {
      const Senpuuki = new ethers.getContractFactory('Senpuuki');
      const senpuuki = await Senpuuki.deploy();
      await senpuuki.deployed();
      expect(senpuuki.address).to.be.a('');
   });

   it('start', async function () {
      const start = await senpuuki.start();
      expect(start().emit).to.be.a('start');
   });

   it('stop', async function () {
      const emit = await senpuuki.stop();
      expect(stop().emit).to.be.a('stop');
   })

   it('balanceOf', async function () {
      const balanceOf = await senpuuki.balanceOf();
      expect(balanceOf().emit).to.be.a('balanceOf');
   })

})
   