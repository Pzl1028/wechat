// pages/payorder/payorder.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio1: true,
    radio2: false,
    hasAddress: true,
    password: null,
    address: {},
    skuu: [],
    product_id: "",
    selected_list: {},
    qweqwe: "block",
    total: '',
    asdasd: "none",
    product: {},
    size: "",
    name: "",
    height: "",
    weight: "",
    sex: "",
    breadth: "",
    arm_length: "",
    hip_circumference: "",
    waist_circumference: "",
    knee_circumference: "",
    long_legs: "",
    s_buttock_height: "",
    s_cross: "",
    s_cross_height: "",
    s_neck_girth: "",
    s_waist_height: "",
    kordera: "block",
    korderb: "none",
    discount: 0,
    selectAllStatus: true,
    cartss: [{
        idasd: 'W',
        name: '微信支付',
        value: 'W',
        image: '/img/paymart.png',
      },
      {
        idasd: 'B',
        name: '余额支付',
        value: 'B',
        image: '/img/paybalance.png',
      },
    ],
    hintButton: "none"
  },
  //关闭支付警示窗口
  shutButton: function() {
    var that = this
    this.setData({
      hintButton: "none"
    })
  },
  //选择支付方式
  radioChoose: function(e) {
    var payWay = e.detail.value
    wx.setStorageSync('payWay', payWay)
  },
  //使用优惠券
  useCoupons: function() {
    var that = this;
    var list = that.data.selected_list[0].shop_cart_id;
    console.log(list)
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher?list=' + list
    })
  },
  useCoupons: function() {
    var that = this
    var product_pricea = that.data.product_pricea
    console.log(product_pricea)
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher?product_pricea=' + product_pricea
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取地址
    var member_id = wx.getStorageSync('member_id');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id
    }, function(res) {
      console.log(res.data[0])
      if (res.data[0] == null) {
        wx.showModal({
          content: '添加收货地址',
          success: function() {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/mine/address/address'
              })
            }
          },
          fail: function(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/mine/address/address'
              })
            }
          }
        })
        that.setData({
          hasAddress: false
        })
      } else {
        that.setData({
          address: res.data[0]
        })
      }
    });
    //购物车传值信息
    var selected_list = app.globalDate.selected_list;
    var total = options.total;
    if (selected_list == "") {
      that.setData({
        kordera: "none",
        krederb: "block"
      })
    }
    console.log(selected_list)
    that.setData({
      selected_list: selected_list //商品信息
    });
    //结算页面接收数据
    var product_pricea = options.product_pricea;
    console.log(product_pricea)
    if(product_pricea!=undefined){
      that.setData({

      })

    }
    //身体尺寸信息
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/custom/newCustom', 'GET', {
      'memberId': member_id,
      'state': 1
    }, function (res) {
      console.log(res.data)
      // console.log(res.data.cus[0].sex)
      // var asd = res.data.cus[0].sex
      // if (asd == 1) {
      //   var asdasd = "男"
      // }
      // if (asd == 2) {
      //   var asdasd = "女"
      // }
      that.setData({
        sex: asdasd,
        name: res.data.cus[0].name,
        height: res.data.cus[0].height,
        weight: res.data.cus[0].weight,
        breadth: res.data.cus[0].s_neck_girth, //领围
        arm_length: res.data.cus[0].arm_length, //臂长
        hip_circumference: res.data.cus[0].hip_circumference, //胸围
        waist_circumference: res.data.cus[0].waist_circumference, //腰围
        knee_circumference: res.data.cus[0].knee_circumference, //臀围
        long_legs: res.data.cus[0].breadth, //肩宽
      })
      console.log(nickName+"name")
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})