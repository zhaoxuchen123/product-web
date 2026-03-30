#!/usr/bin/env python3
"""
update_version.py — 供 Jenkins Pipeline 调用，更新 docs/public/versions.json 中的产品版本。

用法:
    python3 scripts/update_version.py --product nic-driver/dw --version v3.0.20 [--status stable]

参数:
    --product   版本 key，对应 versions.json 中的 key（如 nic-driver/dw）
    --version   新版本号（如 v3.0.20）
    --status    版本状态：stable / beta / dev（默认 stable）
    --file      versions.json 路径（默认 docs/public/versions.json）
"""

import argparse
import json
import sys
from datetime import date
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description='Update product version in versions.json')
    parser.add_argument('--product', required=True, help='Product key, e.g. nic-driver/dw')
    parser.add_argument('--version', required=True, help='Version string, e.g. v3.0.20')
    parser.add_argument('--status', default='stable', choices=['stable', 'beta', 'dev'],
                        help='Release status (default: stable)')
    parser.add_argument('--file', default='docs/public/versions.json',
                        help='Path to versions.json (default: docs/public/versions.json)')
    args = parser.parse_args()

    versions_path = Path(args.file)
    if not versions_path.exists():
        print(f'Error: {versions_path} not found', file=sys.stderr)
        sys.exit(1)

    with versions_path.open('r', encoding='utf-8') as f:
        data = json.load(f)

    if args.product not in data:
        print(f'Warning: product "{args.product}" not found in versions.json, adding it.')

    old_version = data.get(args.product, {}).get('version', '(none)')
    data[args.product] = {
        'version': args.version,
        'status': args.status,
        'updated': date.today().isoformat(),
    }

    with versions_path.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print(f'[update_version] {args.product}: {old_version} -> {args.version} ({args.status})')


if __name__ == '__main__':
    main()
