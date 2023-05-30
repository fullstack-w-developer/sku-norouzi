import { QueryParams } from "../../types/services";

const getQuery = (value: any, key: string) => {
    if (!(typeof value === "undefined")) {
        if (key) return key + "=" + value;
    }
};

export const generateQueries = (queries: QueryParams = {}) => {
    const { page, limit, order, sort, q, ...other } = queries;
    const formattedQueries = {
        page: getQuery(page, "page"),
        limit: getQuery(limit, "per_page"),
        order: getQuery(order, "order"),
        sort: getQuery(sort, "sort"),
        q: getQuery(q, "q"),
    };
    return generateQueryString(formattedQueries, other);
};

const generateQueryString = <Q extends Object, O extends QueryParams>(queries: Q, other: O) => {
    let query = "?";

    const arrayQueries: string[] = [];

    Object.values(queries).forEach((value, i) => {
        const joiner = i > 0 ? "&" : "";
        if (!(typeof value === "undefined")) {
            query = query + joiner + value;
        }
    });

    Object.entries({ ...other }).forEach(([key, value]) => {
        const val = value.toString();
        const isArray = Boolean(arrayQueries.find((query) => query === key));
        if (!isArray && Boolean(val)) {
            query = query + `&${key}=${value}`;
        } else if (isArray && Boolean(value)) {
            const generated = generateArrayQuery(key, value);
            query = query + generated;
        }
    });

    return query;
};

const generateArrayQuery = (key: string, value: string) => {
    let query = "";
    const splitted: string[] = value.toString().split(",");
    splitted.forEach((val, i) => (query = query + `&${key}[${i}]=${val}`));
    return query;
};

export const generateArrayQueryObject = (queries: Object) => {
    let data: QueryParams = {};
    Object.entries(queries).forEach(([value, key]) => {
        if (Array.isArray(key)) {
            key.forEach((item, index) => {
                data = {
                    ...data,
                    [`${value}[${index}]`]: item,
                };
            });
        } else {
            data = {
                ...data,
                [value]: key,
            };
        }
    });

    return data;
};
