import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VeriESGModule = buildModule("VeriESGModule", (m) => {
  const veriESG = m.contract("VeriESG", ["VeriESG", "VESG"]);

  return { veriESG };
});

export default VeriESGModule;
