import React, { useCallback, useContext, useState } from "react";
import { TextField, Button, Paper, Typography, Divider } from "@material-ui/core";
import { useFormik } from "formik";
import styles from "./Login.module.scss";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTRATION } from "../../queries/user";
import { UserContext } from "../UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { paths } from "../../constants/routes";
import { STORAGE_KEY_ID } from "../../constants/common";
import PasswordField from "./PasswordField/PasswordField";
import validation from "../../utils/validation";
import { useTranslation } from "react-i18next";

interface IFormValues {
  email: string,
  password: string
}

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [login] = useMutation(LOGIN);
  const [registration] = useMutation(REGISTRATION);
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toggleForm = useCallback(() => setIsLogin((value) => !value), [setIsLogin]);
  const onSubmit = useCallback(async ({ email, password }: IFormValues) => {
    if (isLogin) {
      const result = await login({ variables: { email, password } });

      if (result) {
        const { _id, ...userData } = result.data.login;

        setUser({ ...userData, id: _id });
        localStorage.setItem(STORAGE_KEY_ID, "true");
        history.push(paths.main);
      }
    } else {
      await registration({ variables: { record: { email, password } } });
      toggleForm();
    }
  }, [login, setUser, history, isLogin, registration, toggleForm]);

  const validate = useCallback(({ repeatPassword, ...values }) => validation(isLogin ? values : { repeatPassword, ...values }), [isLogin]);
  const formik = useFormik({ initialValues, onSubmit, validate, validateOnBlur: true });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper className={styles.wrapper}>
        <Typography variant="h5">{t(`pages.login.titles.${isLogin ? "login" : "registration"}:`)}</Typography>
        <TextField
          name="email"
          label={t("pages.login.labels.email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordField
          fullWidth
          id="password"
          name="password"
          label={t("pages.login.labels.password")}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {!isLogin && (
          <PasswordField
            fullWidth
            id="repeatPassword"
            name="repeatPassword"
            label={t("pages.login.labels.repeatPassword")}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
            helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
          />
        )}
        <Button color="primary" variant="contained" fullWidth type="submit">
          {t("btns.submit")}
        </Button>
        <Divider/>
        <Button onClick={toggleForm}>
          {t(`btns.${ isLogin ? "registration" : "login" }`)}
        </Button>
      </Paper>
    </form>
  );
}

export default Login;
