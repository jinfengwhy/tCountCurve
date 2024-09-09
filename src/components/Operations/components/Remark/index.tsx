import { memo, useEffect, useState } from "react";
import Taro from '@tarojs/taro'
import { View, Button, Textarea } from "@tarojs/components";

import "./index.less";

interface IProps {}

const Remark = memo((props: IProps) => {
  const [value, setValue] = useState("");
  const [isShowTextarea, setIsShowTextarea] = useState(false);

  useEffect(() => {
    if (isShowTextarea) {
      setValue("");
    }
  }, [isShowTextarea]);

  function handleMark() {
    setIsShowTextarea(true);
  }

  function handleSave() {
    Taro.showToast({
      title: '保存成功，到历史查看',
      icon: 'none',
      duration: 2000,
      success: () => {
        console.log('save value: ', value);
        onClear();
      }
    })
  }

  function onClear() {
    setTimeout(() => {
      setIsShowTextarea(false);
    }, 200);
  }

  return (
    <View className="operations-remark">
      {!isShowTextarea && (
        <Button className="mark" onClick={handleMark}>
          备注
        </Button>
      )}
      {isShowTextarea && (
        <Button className="save" onClick={handleSave}>
          保存
        </Button>
      )}

      {isShowTextarea && (
        <Textarea
          className="textarea-remark"
          value={value}
          placeholder='记录此时心情，分享给其他人吧'
          focus
          autoFocus
          autoHeight
          onInput={e => setValue(e.detail.value)}
          onConfirm={handleSave}
          onBlur={onClear}
        />
      )}
    </View>
  );
});

export default Remark;
