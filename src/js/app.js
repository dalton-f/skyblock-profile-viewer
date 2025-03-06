/* eslint-disable camelcase */

import * as NBT from "nbtify";

import pako from "pako";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetch(
    `/.netlify/functions/fetchProfilesByUUID?uuid=666bb608-c287-4b47-aa1c-e775690cba66`,
  );

  const { profiles } = await data.json();

  let selectedProfile;

  // The selected profile is not always at the 0th index, so search for it
  for (const profile of profiles)
    if (profile.selected) selectedProfile = profile.members;

  // Note - the key is always the condensed version of the UUID (no dashes)
  for (const [key, value] of Object.entries(selectedProfile)) {
    if (key === "666bb608c2874b47aa1ce775690cba66") selectedProfile = value;
  }

  // At this point we have usable data
  const { rift } = selectedProfile;

  const { inventory } = selectedProfile;
  const { bag_contents } = inventory;
  const { talisman_bag } = bag_contents;

  const test = talisman_bag.data;

  const binaryString = atob(test);

  // 2. Convert binary string to Uint8Array
  const uint8Array = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // 3. Gzip decompress
  const decompressedData = pako.ungzip(uint8Array, { to: "Uint8Array" });

  // 4. Convert decompressed data to ArrayBuffer
  const nbtBuffer = decompressedData.buffer;

  // 5. NBT parse
  const nbtData = await NBT.read(nbtBuffer);

  console.log(nbtData);

  console.log(rift);
});
