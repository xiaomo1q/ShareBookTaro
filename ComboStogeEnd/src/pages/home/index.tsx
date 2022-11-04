import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import { testD } from './data';

const Home: React.FC<any> = (props) => {
  const [columns, setColumns] = useState<any>([]);
  const [data, setData] = useState<Interface.ColumnTable[]>();

  useEffect(() => {
    const column: any[string] = {
      id: 'id',
      name: '部门名称',
      typeName: '类型',
      sort: '排序',
      createUserName: '添加人',
      createTime: '添加时间',
      updateUserName: '更新人',
      updateTime: '更新时间',
    };
    let col: any = [];
    for (var k in column) {
      if (Object.prototype.hasOwnProperty.call(column, k)) {
        for (const key in testD[0]) {
          if (Object.prototype.hasOwnProperty.call(testD[0], key)) {
            if (k === key) {
              let title = column[k];
              col.push({
                title: title,
                dataIndex: k,
                key: k,
                width: k.length > 5 ? 200 : 100,
              });
            }
          }
        }
      }
    }
    const res = arrayToTree(testD, 0);
    setData(res);
    setColumns(col);
  }, []);

  const arrayToTree = (
    arr: { id: number; name: string; pid: number }[],
    parentId: number,
  ) => {
    //  arr 是返回的数据  parendId 父id
    let temp: any[] = [];
    let treeArr: any[] = arr;
    treeArr.forEach((item: any, index: any) => {
      if (item.pid == parentId) {
        if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
          // 递归调用此函数
          treeArr[index].children = arrayToTree(treeArr, treeArr[index].id);
        }
        temp.push(treeArr[index]);
      }
    });

    return temp;
  };

  return (
    <>
      <Table columns={columns} dataSource={data} size={'small'} rowKey="id" />
    </>
  );
};

export default Home;
