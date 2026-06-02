# DesignWare 网卡共用 MDIO 设备树配置

DW 网卡设备树支持配置 MAC 地址、MTU、中断、时钟、MDIO 总线、PHY 地址和 `phy-handle` 等属性。部分板卡上多个 GMAC 控制器会共用同一条 MDIO 总线，此时需要将所有 PHY 统一挂载到提供 MDIO 的网卡节点下，并让其他网卡通过 `phy-handle` 引用对应 PHY。

本文以 `gmac0` 提供 MDIO 总线，`gmac0` 与 `gmac1` 共用该 MDIO 总线为例说明配置方法。

## 配置前确认

配置共用 MDIO 前，需要先确认：

- 哪个网卡节点负责提供 MDIO 总线，例如 `gmac0`；
- 每个 PHY 在 MDIO 总线上的地址，例如 `gmac0` 的 PHY 地址为 `6`，`gmac1` 的 PHY 地址为 `2`；
- 设备树节点顺序是否满足加载要求：提供 MDIO 总线的网卡应先创建。

## 原始设备树示例

以下示例中，`gmac0` 与 `gmac1` 尚未配置 `phy-handle` 和 MDIO 子节点：

```text
gmac1: ethernet@e0049000 {
    compatible = "fmsh,fmql-gmac", "snps,dwmac-3.70a", "snps,dwmac";
    reg = <0x0 0xe0049000 0x0 0x2000>;
    reg-names = "stmmaceth";

    phy-mode = "rgmii-id";
    fmsh,gmac-number = <1>;
    snps,force_sf_dma_mode = <1>;
    snps,multicast-filter-bins = <1>;
    snps,perfect-filter-entries = <1>;
    status = "okay";
};

gmac0: ethernet@e0047000 {
    compatible = "fmsh,fmql-gmac", "snps,dwmac-3.70a", "snps,dwmac";
    reg = <0x0 0xe0047000 0x0 0x2000>;
    reg-names = "stmmaceth";

    phy-mode = "rgmii-id";
    fmsh,gmac-number = <0>;
    snps,force_sf_dma_mode = <1>;
    snps,multicast-filter-bins = <1>;
    snps,perfect-filter-entries = <1>;
    status = "okay";
};
```

## 共用 MDIO 配置示例

目标配置：

- `gmac0` 的 PHY 地址为 `6`；
- `gmac1` 的 PHY 地址为 `2`；
- `gmac0` 和 `gmac1` 共用 `gmac0` 的 MDIO 总线。

```text
gmac0: ethernet@e0047000 {
    compatible = "fmsh,fmql-gmac", "snps,dwmac-3.70a", "snps,dwmac";
    reg = <0x0 0xe0047000 0x0 0x2000>;
    reg-names = "stmmaceth";

    phy-mode = "rgmii-id";
    phy-handle = <&phy0>;
    fmsh,gmac-number = <0>;
    snps,force_sf_dma_mode = <1>;
    snps,multicast-filter-bins = <1>;
    snps,perfect-filter-entries = <1>;
    status = "okay";

    mdio: mdio@0 {
        compatible = "snps,dwmac-mdio";
        #address-cells = <1>;
        #size-cells = <0>;

        phy0: eth-phy@6 {
            reg = <6>;
        };

        phy1: eth-phy@2 {
            reg = <2>;
        };
    };
};

gmac1: ethernet@e0049000 {
    compatible = "fmsh,fmql-gmac", "snps,dwmac-3.70a", "snps,dwmac";
    reg = <0x0 0xe0049000 0x0 0x2000>;
    reg-names = "stmmaceth";

    phy-mode = "rgmii-id";
    phy-handle = <&phy1>;
    fmsh,gmac-number = <1>;
    snps,force_sf_dma_mode = <1>;
    snps,multicast-filter-bins = <1>;
    snps,perfect-filter-entries = <1>;
    status = "okay";
};
```

## 配置说明

- `mdio` 子节点用于描述当前网卡提供的 MDIO 总线。
- `phy0`、`phy1` 等子节点描述挂载在该 MDIO 总线上的 PHY 设备。
- `reg` 表示 PHY 在 MDIO 总线上的地址。
- `phy-handle` 用于指定当前网卡绑定的 PHY 节点。
- 共用 MDIO 时，非 MDIO 提供者节点不再单独创建 MDIO 子节点，只通过 `phy-handle` 引用共享总线上的 PHY。

## 注意事项

使用 MDIO 复用时，必须先加载提供 MDIO 总线的网卡，再加载复用该总线的网卡。通常可通过调整设备树中 `gmac0`、`gmac1` 的定义顺序来影响创建顺序。

例如上面的配置中，`gmac0` 提供 MDIO 总线，因此建议 `gmac0` 节点位于 `gmac1` 节点之前。如果改为复用 `gmac1` 的 MDIO 总线，则应相应调整节点顺序，并将 MDIO 子节点放到 `gmac1` 下。
