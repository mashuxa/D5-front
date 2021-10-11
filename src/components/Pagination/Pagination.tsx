import { Pagination as PaginationMUI } from "@material-ui/core";
import React, { useCallback } from "react";
import styles from "./Pagination.module.scss";
import { PaginationProps } from "@material-ui/core/Pagination/Pagination";

interface IPaginationProps extends Omit<PaginationProps, "onChange"> {
  onChange: (value: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ onChange, ...props }) => {
  const onChangePage = useCallback((_, page: number) => onChange(page), [onChange]);

  return (
    <PaginationMUI {...props} onChange={onChangePage} className={styles.pagination}  shape="rounded"/>
  );
}

export default Pagination;

