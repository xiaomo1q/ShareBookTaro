// @ts-ignore
/* eslint-disable */

declare namespace Interface {
  type Captcha = {
    text: string;
    img: any;
  };

  type ColumnTable = {
    id?: String;
    name?: String;
    typeName?: string;
    sort?: string | number;
    createUserName?: string;
    createTime?: string;
    updateUserName?: string;
    updateTime?: string;
    children?: Column[];
  };
  type Column = {
    id?: String;
    name?: String;
    typeName?: string;
    sort?: string | number;
    createUserName?: string;
    createTime?: string;
    updateUserName?: string;
    updateTime?: string;
    children?: ColumnTable[];
  };
}
