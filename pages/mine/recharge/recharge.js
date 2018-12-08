// pages/mine/recharge/recharge.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id: 0,  
    pres:"",
    balance:"",
  },
  click: function (e) {
    var ids = e.currentTarget.dataset.id;
    var asd = e.currentTarget.dataset.asd;
    console.log(ids)
    this.setData({
      id: ids,
      asd:asd,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
      var that = this
      //获余额信息
    var member_id = wx.getStorageSync('memberId');  //用户id
    console.log(member_id)
    app.apiRequest('/member/getbalance','GET',{
      'member_id': member_id
      },function(resd){
        console.log(resd.data)
        that.setData({
          balance: resd.data.balance
        })
      })


    //获取充值金额
    app.apiRequest('/Balance/getBalance','POST',{
      state:1,
    },function(resa){
      console.log(resa.data.length)
      var asd = resa.data.length
      let asda =[]
      for(var i=0;i<asd;i++){
        asda.push(resa.data[i] );
      }
      console.log(asda)
      that.setData({
        pres: asda
      })
    })
  },
  // 充值
  recharge:function(){
    var that = this
    var id = that.data.id
    console.log(id)
    var opendid = wx.getStorageSync('openid') //用户openID
    console.log(opendid)
    var amount = this.data.asd   //充值金额
    console.log(amount)
    var recharge_way ='W'
    console.log(recharge_way)
    var member_id = wx.getStorageSync('memberId');  //用户id
    console.log(member_id)
    app.apiRequest('/RechargeWeiXinPay/createRecharge','GET',{
      'member_id': member_id,
      'openid': opendid,
      'amount': amount,
      'id':id,
      'recharge_way': recharge_way
    },function(res){
      console.log(res)
      if (res.status = 200){
        var zhi = res.resultMap
        wx.setStorageSync('out_trade_no', res.orderNum)
        that.zhifu(zhi.timestamp, zhi.noncestr, zhi.prepayid, zhi.sign)
        wx.showToast({
          title: '订单生成成功',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '订单生成失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  //支付
  zhifu(timestamp, noncestr, prepayid, sign) {
    console.log('pay' + this.data.ec_code)
    var out_trade_no = wx.getStorageSync('out_trade_no')
    wx.requestPayment({
      'timeStamp': timestamp,
      'nonceStr': noncestr,
      'package': 'prepay_id=' + prepayid,
      'signType': 'MD5',
      'paySign': sign,
      'success': function (res) {
        if (res.errMsg == 'requestPayment:ok') {
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      },
      'fail': function (res) {
        wx.showToast({
          title: '支付失败！',
          icon: 'none',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/home/home',
        })
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
    var that = this
    var balance = wx.getStorageSync('balance') 
    var password = wx.getStorageSync('password')
    var accounts = wx.getStorageSync('mobile')
    that.setData({
      balance: balance
    })
    // app.apiRequest('/member/memberLogin', 'POST',
    //   {
    //     'mobile': accounts,
    //     'password': password
    //   }, function (res) {
    //     that.setData({
    //       balance: res.data.balance,
    //     })
    //   });
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