pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

//Dataとは、データを格納するためのコントラクト
library Data {

   //labelとは。ラベルのこと
    struct Label {
        bytes32 data;
        uint length;
    }

    struct Edge {
        bytes32 node;
        Label label;
    }

    struct Node {
        Edge[2] children;
    }

    struct Tree {
        bytes32 root;
        Data.Edge rootEdge;
        mapping(bytes32 => Data.Node) nodes;
    }

    //splitCommonPrefixとは、共通のプレフィックスを分割すること
      function splitCommonPrefix(Data.Label memory label, uint prefixLength) internal pure returns (Data.Label memory prefix, Data.Label memory suffix) {
         require(prefixLength <= label.length);
         prefix = Data.Label(label.data, prefixLength);
         suffix = Data.Label(bytes32(uint(label.data) >> (8 * (32 - prefixLength))), label.length - prefixLength);
      }

      //splitAtとは、分割すること
      function splitAt(Data.Label memory label, uint index) internal pure returns (Data.Label memory prefix, Data.Label memory suffix) {
         require(index <= label.length);
         prefix = Data.Label(label.data, index);
         suffix = Data.Label(bytes32(uint(label.data) >> (8 * (32 - index))), label.length - index);
      }
      //commonPrefixとは、共通のプレフィックスのこと
      function commonPrefix(Data.Label memory label1, Data.Label memory label2) internal pure returns (uint) {
         uint minLength = label1.length < label2.length ? label1.length : label2.length;
         for (uint i = 0; i < minLength; i++) {
            if (label1.data[i] != label2.data[i]) {
               return i;
            }
         }
         return minLength;
      }

      //removePrefixとは、プレフィックスを削除すること
      function removePrefix(Data.Label memory label, uint prefixLength) internal pure returns (Data.Label memory) {
         require(prefixLength <= label.length);
         return Data.Label(bytes32(uint(label.data) >> (8 * prefixLength)), label.length - prefixLength);
      }
      //chopFirstBitとは、最初のビットを切り取ること
      function chopFirstBit(Data.Label memory label) internal pure returns (Data.Label memory) {
         require(label.length > 0);
         return Data.Label(bytes32(uint(label.data) >> 8), label.length - 1);
      }
      //edgeHashとは、エッジのハッシュのこと
      function edgeHash(Data.Edge memory edge) internal pure returns (bytes32) {
         return keccak256(edge.node, edge.label.data, edge.label.length);
      }
      //hashとは、ハッシュのこと
      function hash(Data.Node memory node) internal pure returns (bytes32) {
         return keccak256(node.children[0].node, node.children[0].label.data, node.children[0].label.length, node.children[1].node, node.children[1].label.data, node.children[1].label.length);
      }
      //insertNodeとは、ノードを挿入すること
      function insertNode(Data.Tree storage tree, bytes32 parent, Data.Edge memory edge) internal {
         tree.nodes[edge.node] = Data.Node([Data.Edge(0, Data.Label(0, 0)), Data.Edge(0, Data.Label(0, 0))]);
         tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].node = edge.node;
         tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].label = edge.label;
      }
      //replaceNodeとは、ノードを置き換えること
      function replaceNode(Data.Tree storage tree, bytes32 parent, Data.Edge memory edge) internal {
         tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].node = edge.node;
         tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].label = edge.label;
      }
      //insertAtEdgeとは、エッジに挿入すること
      function insertAtEdge(Data.Tree storage tree, bytes32 parent, Data.Edge memory edge, Data.Label memory label, bytes32 node) internal {
         Data.Label memory prefix;
         Data.Label memory suffix;
         (prefix, suffix) = splitCommonPrefix(label, commonPrefix(edge.label, label));
         if (prefix.length == edge.label.length) {
            insertAtNode(tree, edge.node, suffix, node);
         } else {
            Data.Node memory newNode = Data.Node([Data.Edge(0, Data.Label(0, 0)), Data.Edge(0, Data.Label(0, 0))]);
            tree.nodes[edge.node] = newNode;
            tree.nodes[edge.node].children[uint(suffix.data[0] >> 7)].node = node;
            tree.nodes[edge.node].children[uint(suffix.data[0] >> 7)].label = suffix;
            tree.nodes[edge.node].children[uint(edge.label.data[prefix.length] >> 7)].node = edge.node;
            tree.nodes[edge.node].children[uint(edge.label.data[prefix.length] >> 7)].label = removePrefix(edge.label, prefix.length);
            tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].node = edge.node;
            tree.nodes[parent].children[uint(edge.label.data[0] >> 7)].label = prefix;
         }
      }
      //insertとは、挿入すること
      function insert(Data.Tree storage tree, Data.Label memory label, bytes32 node) internal {
         insertAtNode(tree, tree.root, label, node);
      }
      


}