pragma solidity ^0.5.0;

interface IUniswapV2Pair {
    event Approval(address indexed owner, address indexed spender, uint value);
      event Transfer(address indexed from, address indexed to, uint value);

      function name() external pure returns (string memory);

      function symbol() external pure returns (string memory);

      function decimals() external pure returns (uint8);

      function totalSupply() external view returns (uint);

      function balanceOf(address owner) external view returns (uint);

      function allowance(address owner, address spender) external view returns (uint);


    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

    function approve(address spender, uint value) external returns (bool);

      function transfer(address to, uint value) external returns (bool);

      function transferFrom(address from, address to, uint value) external returns (bool);

      function DOMAIN_SEPARATOR() external view returns (bytes32);

      function PERMIT_TYPEHASH() external pure returns (bytes32);

      function nonces(address owner) external view returns (uint);

      function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

      function MINIMUM_LIQUIDITY() external pure returns (uint);

      function factory() external view returns (address);

      
}