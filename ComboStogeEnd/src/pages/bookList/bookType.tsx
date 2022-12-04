import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import { Add_book_type, Del_book_type, Get_book_type } from '@/services/book';
import styles from './index.less';
/**
 * 图书分类
 * @returns 
 */
const BookTypeTag: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  // 获取
  const fetchBookType = async () => {
    await Get_book_type().then((res) => {
      const arr: string[] = []
      res.forEach((el: { book_type: any; }) => {
        arr.push(el.book_type)
      });
      setTags(arr);
    })
      .catch((err) => {
        console.log(err, '............');
      });
  };

  useEffect(() => {
    fetchBookType()
  }, [])

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = async (removedTag: string) => {
    // const newTags = tags.filter((tag) => tag !== removedTag);
    // console.log(newTags);
    await Del_book_type({ book_type: removedTag }).then(res=>{
      if(!!res&&res.code=== 0){
        fetchBookType()
      }
    })
    // setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async() => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      await Add_book_type({ book_type: inputValue }).then(res=>{
        if(!!res&&res.code=== 0){
          fetchBookType()
        }
      })
      // setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== -1}
            onClose={() => handleClose(tag)}
            color="geekblue"
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput} color="geekblue">
          <PlusOutlined /> 分类
        </Tag>
      )}
    </>
  );
};

export default BookTypeTag;