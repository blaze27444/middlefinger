// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {Vm} from "forge-std/Vm.sol";
import {ICreateX} from "createx/ICreateX.sol";

import {DeployUtils} from "../libraries/DeployUtils.sol";
import {PingPong} from "../src/PingPong.sol";
import {RemoteMultisend} from "../src/RemoteMultisend.sol";

contract Deploy is Script {
    /// @notice Array of RPC URLs to deploy to, deploy to supersim 901 and 902 by default.
    string[] private rpcUrls = ["http://localhost:9545", "http://localhost:9546"];

    /// @notice Modifier that wraps a function in broadcasting.
    modifier broadcast() {
        vm.startBroadcast(msg.sender);
        _;
        vm.stopBroadcast();
    }

    function run() public {
        for (uint256 i = 0; i < rpcUrls.length; i++) {
            string memory rpcUrl = rpcUrls[i];

            console.log("Deploying to RPC: ", rpcUrl);
            vm.createSelectFork(rpcUrl);
            deployPingPongContract();
            deployRemoteMultisendContract();
        }
    }

    function deployPingPongContract() public broadcast returns (address addr_) {
        uint256 serverChainId = 901;
        bytes memory initCode = abi.encodePacked(type(PingPong).creationCode, abi.encode(serverChainId));
        addr_ = DeployUtils.deployContract("PingPong", _implSalt(), initCode);
    }

    function deployRemoteMultisendContract() public broadcast returns (address addr_) {
        bytes memory initCode = abi.encodePacked(type(RemoteMultisend).creationCode);
        addr_ = DeployUtils.deployContract("RemoteMultisend", _implSalt(), initCode);
    }

    /// @notice The CREATE2 salt to be used when deploying a contract.
    function _implSalt() internal view returns (bytes32) {
        return keccak256(abi.encodePacked(vm.envOr("DEPLOY_SALT", string("ethers phoenix"))));
    }
}
