import { BigNumber } from "bignumber.js";
import { Address } from "./primitives";
import { IAddress } from "./interface";

export class DefinitionOfFungibleTokenOnNetwork {
    identifier: string = "";
    name: string = "";
    ticker: string = "";
    owner: string = "";//IAddress = new Address("");
    decimals: number = 0;
    supply: BigNumber = new BigNumber(0);
    isPaused: boolean = false;
    canUpgrade: boolean = false;
    canMint: boolean = false;
    canBurn: boolean = false;
    canChangeOwner: boolean = false;
    canPause: boolean = false;
    canFreeze: boolean = false;
    canWipe: boolean = false;
    canAddSpecialRoles: boolean = false;

    static fromApiHttpResponse(payload: any): DefinitionOfFungibleTokenOnNetwork {
        let result = new DefinitionOfFungibleTokenOnNetwork();

        result.identifier = payload.identifier || "";
        result.name = payload.name || "";
        result.ticker = payload.ticker || "";
        result.owner = payload.owner.toString("hex");//new Address(payload.owner || "");
        result.decimals = payload.decimals || 0;
        result.supply = new BigNumber(payload.supply || "0");
        result.isPaused = payload.isPaused || false;
        result.canUpgrade = payload.canUpgrade || false;
        result.canMint = payload.canMint || false;
        result.canBurn = payload.canBurn || false;
        result.canChangeOwner = payload.canChangeOwner || false;
        result.canPause = payload.canPause || false;
        result.canFreeze = payload.canFreeze || false;
        result.canWipe = payload.canWipe || false;

        return result;
    }

    /**
     * The implementation has been moved here from the following location:
     * https://github.com/ElrondNetwork/elrond-sdk-erdjs/blob/release/v9/src/token.ts
     */
    static fromResponseOfGetTokenProperties(identifier: string, data: Buffer[]): DefinitionOfFungibleTokenOnNetwork {
        let result = new DefinitionOfFungibleTokenOnNetwork();

        let [tokenName, _tokenType, owner, supply, ...propertiesBuffers] = data;
        let properties = parseTokenProperties(propertiesBuffers);

        result.identifier = identifier;
        result.name = tokenName.toString();
        result.ticker = identifier;
        result.owner = owner.toString("hex");
        result.decimals = properties.NumDecimals.toNumber();
        result.supply = new BigNumber(supply.toString()).shiftedBy(-result.decimals);
        result.isPaused = properties.IsPaused;
        result.canUpgrade = properties.CanUpgrade;
        result.canMint = properties.CanMint;
        result.canBurn = properties.CanBurn;
        result.canChangeOwner = properties.CanChangeOwner;
        result.canPause = properties.CanPause;
        result.canFreeze = properties.CanFreeze;
        result.canWipe = properties.CanWipe;

        return result;
    }
}

export class DefinitionOfTokenCollectionOnNetwork {
    collection: string = "";
    type: string = "";
    name: string = "";
    ticker: string = "";
    owner: string = "";//IAddress = new Address("");
    decimals: number = 0;
    canPause: boolean = false;
    canFreeze: boolean = false;
    canWipe: boolean = false;
    canTransferNftCreateRole: boolean = false;

    static fromApiHttpResponse(payload: any): DefinitionOfTokenCollectionOnNetwork {
        let result = new DefinitionOfTokenCollectionOnNetwork();

        result.collection = payload.collection || "";
        result.type = payload.type || "";
        result.name = payload.name || "";
        result.ticker = payload.ticker || "";
        result.owner = payload.owner.toString("hex");//new Address(payload.owner || "");
        result.decimals = payload.decimals || 0;
        result.canPause = payload.canPause || false;
        result.canFreeze = payload.canFreeze || false;
        result.canWipe = payload.canWipe || false;
        result.canTransferNftCreateRole = payload.canTransferNftCreateRole || false;

        return result;
    }

    /**
     * The implementation has been moved here from the following location:
     * https://github.com/ElrondNetwork/elrond-sdk-erdjs/blob/release/v9/src/token.ts
     */
    static fromResponseOfGetTokenProperties(collection: string, data: Buffer[]): DefinitionOfTokenCollectionOnNetwork {
        let result = new DefinitionOfTokenCollectionOnNetwork();

        let [tokenName, tokenType, owner, _, __, ...propertiesBuffers] = data;
        let properties = parseTokenProperties(propertiesBuffers);

        result.collection = collection;
        result.type = tokenType.toString();
        result.name = tokenName.toString();
        result.ticker = collection;
        result.owner = owner.toString("hex");//Address.fromPubkey(owner);
        result.decimals = properties.NumDecimals.toNumber();
        result.canPause = properties.CanPause;
        result.canFreeze = properties.CanFreeze;
        result.canWipe = properties.CanWipe;
        result.canTransferNftCreateRole = properties.CanTransferNFTCreateRole;

        return result;
    }
}

// Token properties have the following format: {PropertyName}-{PropertyValue}.
function parseTokenProperties(propertiesBuffers: Buffer[]): Record<string, any> {
    let properties: Record<string, any> = {};

    for (let buffer of propertiesBuffers) {
        let [name, value] = buffer.toString().split("-");
        properties[name] = parseValueOfTokenProperty(value);
    }

    return properties;
}

// This only handles booleans and numbers.
function parseValueOfTokenProperty(value: string): any {
    switch (value) {
        case "true": return true;
        case "false": return false;
        default: return new BigNumber(value);
    }
}
