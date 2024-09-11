import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Taro from "@tarojs/taro";

import { edit } from "@/actions/counter";

import { View, Input, Button } from "@tarojs/components";

import "./index.less";

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  edit: (num: number) => void
}

type IProps = PageStateProps & PageDispatchProps

const Index = memo((props: IProps) => {
  const { counter, edit } = props;

  const [tmpNum, setTmpNum] = useState(counter.num);
  const [isShowInput, setIsShowInput] = useState(false);

  useEffect(() => {
    setTmpNum(counter.num);
  }, [counter.num]);

  function handleChange() {
    setIsShowInput(true);
  }

  function handleSave() {
    Taro.showToast({
      title: '修改成功',
      icon: 'none',
      duration: 2000,
      success: () => {
        edit(tmpNum);
        onClear();
      }
    });
  }

  function onClear() {
    setTimeout(() => {
      setIsShowInput(false)
    }, 200)
  }

  return (
    <View className="operations-edit">
      {!isShowInput && (
        <Button className="change" onClick={handleChange}>
          修改
        </Button>
      )}
      {isShowInput && (
        <Button className="save" onClick={handleSave}>
          保存
        </Button>
      )}

      {isShowInput && (
        <Input
          className="input-area-number"
          value={tmpNum + ""}
          type='number'
          placeholder='请输入新的计数值'
          maxlength={7}
          focus
          onInput={e => setTmpNum(Number(e.detail.value))}
          onConfirm={handleSave}
          onBlur={onClear}
        />
      )}
    </View>
  );
});

const mapStateToProps = (state: PageStateProps) => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: any) => ({
  edit: (num: number) => dispatch(edit(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
