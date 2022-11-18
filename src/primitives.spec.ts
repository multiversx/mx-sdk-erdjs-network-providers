import { assert } from "chai";
import { Address } from "./primitives";

describe("test primitives", function () {
    it("should create address from bech32 and from pubkey", async function () {
        let aliceBech32 = "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th";
        let bobBech32 = "erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx";

        assert.equal(new Address(aliceBech32).toString(), aliceBech32);
        assert.equal(new Address(bobBech32).toString(), bobBech32);
    });
});

