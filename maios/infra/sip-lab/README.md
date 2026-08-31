# SIP lab (Phase 2 — WP13)

Isolated owned-voice laboratory: Kamailio/SBC edge, FreeSWITCH media, coturn, WebRTC
client, synthetic numbers and calls, aggressive fraud limits, no production cutover by
default (§3.3, §8.5). SBC is the only public SIP entry point; FreeSWITCH event socket
and management interfaces stay private (§18.4). Production gates in §18.4 must pass
before any real number migrates.
