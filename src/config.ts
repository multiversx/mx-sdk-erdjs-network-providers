import { IPagination } from "./interface";
import { defaultAddressPrefix } from "./constants"

const JSONbig = require("json-bigint")({ constructorAction: 'ignore' });

export const defaultAxiosConfig = {
    timeout: 5000,
    // See: https://github.com/axios/axios/issues/983 regarding transformResponse
    transformResponse: [
        function (data: any) {
            return JSONbig.parse(data);
        }
    ]
};

export const defaultPagination: IPagination = {
    from: 0,
    size: 100
};

export const defaultProviderOptions = {
    addressPrefix: defaultAddressPrefix
}
