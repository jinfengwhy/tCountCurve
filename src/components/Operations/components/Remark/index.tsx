import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Taro from '@tarojs/taro'

import { putRemarkAction } from "@/actions/remark";
import { reset } from '@/actions/counter'

import { View, Button, Textarea } from "@tarojs/components";

import "./index.less";

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  putRemark: (num: number, value: string) => void
  reset: () => void
}

type IProps = PageStateProps & PageDispatchProps

const Index = memo((props: IProps) => {
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
    Taro.showModal({
      title: '提示',
      content: '会清空此次计数，确认保存吗？',
      success: function (res) {
        if (res.confirm) {
          confirmCallback();
        }
      }
    })

    function confirmCallback() {
      Taro.showToast({
        title: '保存成功，请点击历史查看',
        icon: 'none',
        duration: 2000,
        success: () => {
          props.putRemark(props.counter.num, value);
          props.reset();
          onClear();
        }
      })
    }
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
          autoHeight
          showCount
          showConfirmBar={false}
          maxlength={71}
          onInput={e => setValue(e.detail.value)}
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
  putRemark: (counter: number, remark: string) => dispatch(putRemarkAction(counter, remark)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
