#!/usr/bin/env python3
"""Verify the finished WebP's frame count and timing without external packages."""

import argparse
from pathlib import Path


def inspect(path: Path) -> list[int]:
    data = path.read_bytes()
    if len(data) < 12 or data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        raise ValueError("not a RIFF WebP file")
    if int.from_bytes(data[4:8], "little") + 8 != len(data):
        raise ValueError("RIFF size does not match file length")
    delays = []
    animation_header = False
    offset = 12
    while offset + 8 <= len(data):
        kind = data[offset:offset + 4]
        size = int.from_bytes(data[offset + 4:offset + 8], "little")
        start = offset + 8
        end = start + size
        if end > len(data):
            raise ValueError("truncated RIFF chunk")
        if kind == b"ANIM":
            animation_header = True
        elif kind == b"ANMF":
            if size < 16:
                raise ValueError("truncated animation frame header")
            delays.append(int.from_bytes(data[start + 12:start + 15], "little"))
        offset = end + (size % 2)
    if offset != len(data):
        raise ValueError("trailing bytes or invalid padding")
    if not animation_header or not delays:
        raise ValueError("not an animated WebP")
    return delays


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    parser.add_argument("--seconds", type=int, choices=(3, 4), default=3)
    args = parser.parse_args()
    expected_frames = args.seconds * 20
    delays = inspect(args.file)
    if len(delays) != expected_frames or any(delay != 50 for delay in delays):
        raise SystemExit(
            f"FAIL {args.file}: {len(delays)} frames, delays={sorted(set(delays))} ms; "
            f"expected {expected_frames} frames at 50 ms"
        )
    print(f"PASS {args.file}: {len(delays)} frames, 20 fps, {sum(delays) / 1000:g} seconds")


if __name__ == "__main__":
    main()
