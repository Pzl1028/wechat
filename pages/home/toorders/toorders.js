// pages/home/toorders/toorders.js
var app =getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    namea: "", nameb: "", namec: "",named: "",namee: "",namef: "",nameg: "",nameh: "",namei: "",namej: "",
    item: "",
    ljgmx: "", ljgmx1: "", ljgmx2: "", ljgmx3: "", ljgmx4: "", ljgmx5: "", ljgmx6: "", ljgmx7: "", ljgmx8: "", ljgmx9: "", ljgmx10: "", ljgmx11: "", ljgmx12: "",
    // ljgmxa: "", ljgmxb: "", ljgmxc: "", ljgmxd: "", ljgmxe: "", ljgmxf: "", ljgmxg: "", ljgmxh: "", ljgmxi: "",
  },
  //获取input
  namea: function (e) { this.setData({namea: e.detail.value})},
  nameb: function (e) {this.setData({nameb: e.detail.value})},
  namec: function (e) {this.setData({namec: e.detail.value })},
  named: function (e) {this.setData({named: e.detail.value})},
  namee: function (e) {this.setData({namee: e.detail.value})},
  namef: function (e) { this.setData({namef: e.detail.value })},
  nameg: function (e) {this.setData({ nameg: e.detail.value}) },
  nameh: function (e) {this.setData({nameh: e.detail.value})},
  namei: function (e) {this.setData({ namei: e.detail.value})}, 
   namej: function (e) {this.setData({namej: e.detail.value})}, 
  //男装点击
  click: function (e) {
    var aba = e.target.dataset.aba;
    console.log(aba)
    this.setData({
      aba: aba,
    })
  },
  click1: function (e) {
    var abb = e.target.dataset.abb;
    console.log(abb)
    this.setData({
      abb: abb,
    })
  },
  click2: function (e) {
    var ids2 = e.target.dataset.abc;
    console.log(ids2)
    this.setData({
      abc: ids2,
    })
  },
  click3: function (o) {
    var ids3 = o.target.dataset.abd;
    console.log(ids3)
    this.setData({
      abd: ids3,
    })
  },
  click4: function (o) {
    var ids4 = o.target.dataset.abe;
    console.log(ids4)
    this.setData({
      abe: ids4,
    })
  },
  click5: function (o) {
    var ids5 = o.target.dataset.abf;
    console.log(ids5)
    this.setData({
      abf: ids5,
    })
  },
  click6: function (o) {
    var ids6 = o.target.dataset.abg;
    console.log(ids6)
    this.setData({
      abg: ids6,
    })
  },
  click7: function (o) {
    var ids7 = o.target.dataset.abh;
    console.log(ids7)
    this.setData({
      abh: ids7,
    })
  },
  click8: function (o) {
    var ids8 = o.target.dataset.abi;
    console.log(ids8)
    this.setData({
      abi: ids8,
    })
  },
  click9: function (o) {
    var ids9 = o.target.dataset.abj;
    console.log(ids9)
    this.setData({
      abj: ids9,
    })
  },
  click10: function (o) {
    var ids10 = o.target.dataset.abk;
    console.log(ids10)
    this.setData({
      abk: ids10,
    })
  },
  click11: function (o) {
    var ids11 = o.target.dataset.abl;
    console.log(ids11)
    this.setData({
      abl: ids11,
    })
  },
  click12: function (o) {
    var ids12 = o.target.dataset.abm;
    console.log(ids12)
    this.setData({
      abm: ids12,
    })
  },
  //  click13: function (o) {
  //   var ids13 = o.target.dataset.abn;
  //   console.log(ids13)
  //   this.setData({
  //     abn: ids13,
  //   })
  // },

  /**
    * 生命周期函数--监听页面加载   获取规格
    */
  onLoad: function (options) {
    var that = this;
    // var product_id = options.id;
    // console.log(product_id)
    // that.setData({
    //   product_id: product_id
    // });
    //男
    app.apiRequest('/custom/getCoutomTypes', 'GET', {
      'sex': 1
    },
      function (res) {
        console.log(res.data)
        that.setData({ljgmx: res.data[0]});
        that.setData({ljgmx1: res.data[1]});
        that.setData({ljgmx2: res.data[2]});
        that.setData({ljgmx3: res.data[3]});
        that.setData({ljgmx4: res.data[4]});
        that.setData({ljgmx5: res.data[5]});
        that.setData({ljgmx6: res.data[6]});
        that.setData({ljgmx7: res.data[7]});
        that.setData({ljgmx8: res.data[8]});
        that.setData({ljgmx9: res.data[9]});
        that.setData({ljgmx10: res.data[10]});
        that.setData({ljgmx11: res.data[11]});
        that.setData({ljgmx12: res.data[12]});
        // that.setData({
        //   ljgmx6: res.data[6]
        // })
      });
      //女
    // app.apiRequest('/custom/getCoutomTypes', 'GET', {
    //   'sex': 1
    // },
    //   function (resm) {
    //     // console.log(res.data[1])
    //     that.setData({ ljgmxa: resm.data[0] });
    //     that.setData({ ljgmxb: resm.data[1] });
    //     that.setData({ ljgmxc: resm.data[2] });
    //     that.setData({ ljgmxd: resm.data[3] });
    //     that.setData({ ljgmxe: resm.data[4] });
    //     // that.setData({ ljgmxf: resm.data[5] });
    //     // that.setData({
    //     //   ljgmx6: res.data[6]
    //     // })
    //   }
    // );
  },




  submit: function (e) {
    // wx.showToast({
    //   title: '正在内测，马上放出',
    //   icon: 'none',
    //   duration: 2000
    // })
    //提交量体信息
    var that = this
    //男性点击信息提取
    var num = that.data.num //
    var aba = that.data.aba
    var abb = that.data.abb
    var abc = that.data.abc
    var abd = that.data.abd
    var abe = that.data.abe
    var abf = that.data.abf
    var abg = that.data.abg
    var abh = that.data.abh
    var abi = that.data.abi
    var abj = that.data.abj
    var abk = that.data.abk
    var abl = that.data.abl
    var abm = that.data.abm
    let skuu = []
    if (aba !== undefined) { skuu.push(aba); };
    if (abb !== undefined) { skuu.push(abb); };
    if (abc !== undefined) { skuu.push(abc); };
    if (abd !== undefined) { skuu.push(abd); };
    if (abe !== undefined) { skuu.push(abe); };
    if (abf !== undefined) {skuu.push(abf);};
    if (abg !== undefined) {skuu.push(abg);};
    if (abh !== undefined) {skuu.push(abh);};
    if (abi !== undefined) { skuu.push(abi); };
    if (abj !== undefined) { skuu.push(abj); };
    if (abk !== undefined) { skuu.push(abk); };
    if (abl !== undefined) { skuu.push(abl); };
    if (abm !== undefined) { skuu.push(abm); };
    console.log(skuu)
    wx.setStorageSync('skuu', skuu)

    //点击信息提取结束
    // var ids = that.data.id
    // console.log(ids)

    // 手动输入信息提取
    var namea = that.data.namea // 姓名
    wx.setStorageSync('namea', namea)
    console.log(namea)
    var height = that.data.nameb  //身高
    wx.setStorageSync('height', height)
    console.log(height)
    var weight = that.data.namec // 体重
    wx.setStorageSync('weight', weight)
    console.log(weight)
    // var a = that.data.namej // 性别
    // if (a == "男") {
    //   var sex = "1"
    // } else {
    //   var sex = "2"
    // }
    // console.log(namec)
    var breadth = that.data.named // 领围
    wx.setStorageSync('breadth', breadth)
    console.log(breadth)
    var arm_length = that.data.namee // 臂长
    wx.setStorageSync('arm_length', arm_length)
    console.log(arm_length)
    var chest = that.data.namef // 胸围
    wx.setStorageSync('chest', chest)
    console.log(chest)
    var waist_circumference = that.data.nameg //腰围
    wx.setStorageSync('waist_circumference', waist_circumference)
    console.log(waist_circumference)
    var hip_circumference = that.data.nameh //臀围
    wx.setStorageSync('hip_circumference', hip_circumference)
    console.log(hip_circumference)
    var long_legs = that.data.namei //肩宽
    wx.setStorageSync('long_legs', long_legs)
    console.log(long_legs)
    var member_id = wx.getStorageSync('memberId');  //用户id
    app.apiRequest('/custom/addMemberCustom', 'POST', {
      'memberId': member_id,
      'name': namea,
      'height': height,
      'weight': weight,
      'chest': chest,
      // 'sex': sex,
      's_neck_girth': breadth,
      'armLength': arm_length,
      'waistCircumference': waist_circumference,
      'hipCircumference': hip_circumference,
      'breadth': long_legs,
      'kneeCircumference': 0,
      'memCustom': skuu + "",
      'state':0
    }, function (res) {
      if (res.code == 200) {
        wx.showToast({
          title: '录入量体成功',
          icon: 'loading',
          duration: 2000
        });
        wx.navigateTo({
          url: '/pages/home/toorderscz/toorderscz',
        })
      } else {
        wx.showToast({
          title: '录入量体失败',
          icon: 'loading',
          duration: 2000
        });
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})