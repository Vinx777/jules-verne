import React from "react";
import styles from "./FilterArea.module.css";

import { Divider } from "antd";
import { Filter } from "./Filter";

export const FilterArea: React.FC = () => {
    return (
        <>
            <Filter title="route evaluation" tags={["1 star", "2 star", "3 star", "4 star", "5 star"]} />
            <Divider dashed className={styles["filter-divider"]} />
            <Filter title="departure city" tags={["Tokyo", "Osaka", "Nagoya", "Fukuoka"]} />
            <Divider dashed className={styles["filter-divider"]} />
            <Filter title="travel days" tags={["2 days", "3 days", "4 days", "5 days", "6 days"]} />
            <Divider dashed />
            <Filter
                title="journey type"
                tags={["group tour", "free travel", "self-driving tour", "high-end custom"]}
            />
            <Divider dashed />
            <Filter title="departure time" tags={["new year", "golden week", "summer vacation"]} />
        </>
    );
};
