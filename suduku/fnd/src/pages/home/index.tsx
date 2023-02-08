import { View } from '@tarojs/components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.less';

const sudoku = [
  ['.', '.', '.', '4', '.', '.', '.', '3', '.'],
  // ['7', '.', '4', '8', '.', '.', '1', '.', '2'],
  // ['.', '.', '.', '2', '3', '.', '4', '.', '9'],
  // ['.', '4', '.', '5', '.', '9', '.', '8', '.'],
  // ['5', '.', '.', '.', '.', '.', '9', '1', '3'],
  // ['1', '.', '.', '.', '8', '.', '2', '.', '4'],
  // ['.', '.', '.', '.', '.', '.', '3', '4', '5'],
  // ['.', '5', '1', '9', '4', '.', '7', '2', '.'],
  // ['4', '7', '3', '.', '5', '.', '.', '9', '1']
]

const HomeView: React.FC<any> = ({ loading }) => {
  const dispatch = useDispatch()

  const IsRowCol = () => {
    console.log(sudoku[0].length);
    // for (let i = 0; i < sudoku.length; i++) {
    //   // row 行 += 45
    //   for (let r = 0; r < sudoku[i].length; r++) {
    //     // col 列 
    //     for (let c = 0; c < sudoku[i].length; c++) {

    //     }
    //   }
    // }
  }
  useEffect(() => {
    IsRowCol()
  }, []);

  const solveSudoku = (board) => {
    const hasConflit = (r, c, val) => {  // 判断是否有行列和框框的冲突
      for (let i = 0; i < 9; i++) {
        if (board[i][c] == val || board[r][i] == val) { // 行或列里有冲突
          return true;
        }
      }
      const subRowStart = Math.floor(r / 3) * 3; // 对于小框，行有三种起始索引 0、3、6
      const subColStart = Math.floor(c / 3) * 3; // 对于小框，列有三种起始索引 0、3、6
      for (let i = 0; i < 3; i++) {              // 遍历所在的小框
        for (let j = 0; j < 3; j++) {
          if (val == board[subRowStart + i][subColStart + j]) { // 发现了重复数
            return true;
          }
        }
      }
      return false; // 没有发生冲突
    };

    const fill = (i, j) => {
      if (j == 9) { // 列越界，说明填完了一行，填下一行的第一格
        i++;
        j = 0;
        if (i == 9) return true; // 都填完了，返回true
      }
      if (board[i][j] != ".") return fill(i, j + 1); // 不是空格，递归填下一格

      for (let num = 1; num <= 9; num++) {           // 枚举出当前格的所有可填的选择
        if (hasConflit(i, j, String(num))) continue; // 如果存在冲突，跳过这个选择
        board[i][j] = String(num);                   // 作出一个选择
        if (fill(i, j + 1)) return true; // 如果基于它，填下一格，最后可以解出数独，直接返回true
        board[i][j] = ".";               // 如果基于它，填下一格，填1-9都不行，回溯，恢复为空格
      }
      return false; // 尝试了1-9，每个都往下递归，都不能做完，返回false
    };

    fill(0, 0); // 从第一个格子开始填
    return board;
  };



  return (
    <View className={`flex-col ${styles['home-index']}`}>
      <View className={styles['box']}>
        {/* 遍历二维数组，生成九宫格 */}
        {sudoku.map((list, row) => {
          //  div.row 对应数独的行 
          return <View className={styles['row']} key={`row-${row}`}>
            {list.map((item, col) => {
              {/* span 对应数独的每个格子 */ }
              return <View className={styles['span']} key={`box-${col}`}>{item !== '.' && item}</View>
            })}
          </View>
        })}
      </View>
    </View>
  );
}

export default HomeView;