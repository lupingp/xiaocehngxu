var a = getApp(),
  change = null;

Page({
  data: {
    searchClass: "",
    department: [{
      tag: "简介",
      icon: "pifuke color1"
    }, {
      tag: "棚子种类",
      icon: "tuina color2"
    }, {
      tag: "公司地址",
      icon: "guke color3"
    }, {
      tag: "其他",
      icon: "erbihouke color4"
    // }, {
    //   tag: "检验",
    //   icon: "jianyan color5"
    // }, {
    //   tag: "B超",
    //   icon: "Bchaoyuyue-K color6"
    // }, {
    //   tag: "科室7",
    //   icon: "wrong color7"
    // }, {
    //   tag: "科室8",
    //   icon: "wrong color8"
    // }
      }],
    searchDoctor: [],
    快速咨询: "1881881989"
  },
  /**
   * 搜索栏聚焦
   */
  searchFocus: function() {
    this.setData({
      searchClass: "inputFocus"
    });
  },
  /**
   * 搜索栏失焦
   */
  searchBlur: function() {
    this.setData({
      searchClass: ""
    })
  },
  /**
   * 搜索关键词
   */
  searchKey: function(e) {

    // 节流算法
    change && clearTimeout(change);

    change = setTimeout(() => {
      change = null;
      let val = e.detail.value;
      val && a.request({
        "doc_name": val,
        "depId": -1,
        "subdepId": -1
      }, "searchDoctor", data => {
        data = data.data;
        if (typeof data == "object") {
          data.map && data.map(res => {
            res.split = res.name.split(val);
            res.key = val;
            return res;
          });
          this.setData({
            searchDoctor: data
          });
        }
      });
    }, 500);
  },
  //打电话  还是   添加到联系人
  viewClick01: function () {
    var that = this
    //显示“呼叫”、“添加联系人”弹窗
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success: function (res) {
        console.log("点击电话 res：", res)
        if (res.tapIndex == 0) {//直接呼叫
          wx.makePhoneCall({
            phoneNumber: that.data.phonenum,
            success: function (res_makephone) {
              console.log("呼叫电话返回：", res_makephone)
            }
          })
        } else if (res.tapIndex == 1) {//添加联系人
          wx.addPhoneContact({
            firstName: '关关',
            mobilePhoneNumber: that.data.phonenum,
            success: function (res_addphone) {
              console.log("电话添加联系人返回：", res_addphone)
            }
          })
        }
      }
    })
  },
});