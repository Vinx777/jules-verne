import logo from "@/assets/logo.jpg";
import styles from "./Header.module.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";

import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "@/redux/hooks";
import { languageSlice } from "@/redux/language/slice";
import { userSlice } from "@/redux/user/slice";
import { MenuItem, getItem } from "@/utils";
import { getShoppingCart } from "@/redux/shoppingCart/slice";

interface JwtPayLoad extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = useSelector((s) => s.user.token);
  const [username, setUsername] = useState("");

  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayLoad>(jwt);
      setUsername(token.username);
      dispatch(getShoppingCart(jwt));
    }
  }, [dispatch, jwt]);

  const navItems: MenuItem[] = useMemo(() => {
    return [
      getItem(t("header.home_page"), "1"),
      getItem(t("header.weekend"), "2"),
      getItem(t("header.group"), "3"),
      getItem(t("header.backpack"), "4"),
      getItem(t("header.private"), "5"),
      getItem(t("header.cruise"), "6"),
      getItem(t("header.hotel"), "7"),
      getItem(t("header.local"), "8"),
      getItem(t("header.theme"), "9"),
      getItem(t("header.custom"), "10"),
      getItem(t("header.study"), "11"),
      getItem(t("header.visa"), "12"),
      getItem(t("header.enterprise"), "13"),
      getItem(t("header.high_end"), "14"),
      getItem(t("header.outdoor"), "15"),
      getItem(t("header.insurance"), "16"),
    ];
  }, [t]);

  const langItems: MenuItem[] = useMemo(() => {
    return [
      ...languageList.map((l) => {
        return getItem(l.name, l.code);
      }),
      getItem(t("header.add_new_language"), "new"),
    ];
  }, [languageList, t]);

  const menuClickHandler = useCallback(
    (e) => {
      if (e.key === "new") {
        dispatch(
          languageSlice.actions.addLanguage({
            name: "new_lang",
            code: "new_lang",
          })
        );
      } else {
        dispatch(languageSlice.actions.changeLanguage(e.key));
      }
    },
    [dispatch]
  );

  const onLogOut = useCallback(() => {
    dispatch(userSlice.actions.logOut());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className={styles["app-header"]}>
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={<Menu onClick={menuClickHandler} items={langItems} />}
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {jwt ? (
            <Space size={0} className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong> {username}</Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => navigate("/shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems?shoppingCartItems.length:0})
              </Button>
              <Button onClick={onLogOut}>{t("header.signOut")}</Button>
            </Space>
          ) : (
            <Space size={0} className={styles["button-group"]}>
              <Button onClick={() => navigate("/signIn")}>
                {t("header.signin")}
              </Button>
              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
            </Space>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => navigate("/")}>
          <img src={logo} alt="" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={"Please enter travel destination, topic or keywords"}
          className={styles["search-input"]}
          onSearch={(keywords) => navigate("/search/" + keywords)}
        />
      </Layout.Header>
      <Menu
        mode={"horizontal"}
        className={styles["main-menu"]}
        items={navItems}
      />
    </div>
  );
});
