// pages/home/toorderscz/toorderscz.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:0,
      pres:[
        {pre:"399",id:"1"},
        {pre:"699",id:"2"},
        {pre:"1099",id:"3"},
      ],
    hasAddress: true,
    address: {},
    selected_list: [],
    total: '',
    product: {},
    namea: "", height: "", weight: "", breadth: "", arm_length: "", chest: "", waist_circumference: "", hip_circumference: "", long_legs: ""
  },
  click:function(e){
    var ids = e.currentTarget.dataset.id;
    var asd = e.currentTarget.dataset.asd;
    console.log(asd)
    console.log(ids)
    this.setData({
      id:ids,
      asd: asd,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      namea: wx.getStorageSync('namea'),
      height: wx.getStorageSync('height'),
      weight: wx.getStorageSync('weight'),
      breadth: wx.getStorageSync('breadth'),
      arm_length: wx.getStorageSync('arm_length'),
      chest: wx.getStorageSync('chest'),
      waist_circumference: wx.getStorageSync('waist_circumference'),
      hip_circumference: wx.getStorageSync('hip_circumference'),
      long_legs: wx.getStorageSync('long_legs'),
    })
    var member_id = wx.getStorageSync('memberId');




    
    //获取地址
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id,
    }, function (res) {
      console.log(res.data[0])
      if (res.data[0] == null) {
        wx.showModal({
          content: '请先添加收货地址',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/mine/address/address',
              })
            }
          }, fail: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/home'
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
  },

  clicka:function(){
      var that = this
      var id = that.data.id
      console.log(id)
    var address_id = this.data.address.address_id; //dizhi
    console.log(address_id)
      var opendid = wx.getStorageSync('openid') //用户openID
      console.log(opendid)
    var amount = that.data.asd  //充值金额
      console.log(amount)
      var recharge_way = 'W'
      console.log(recharge_way)
      var member_id = wx.getStorageSync('memberId');  //用户id
      console.log(member_id)
    app.apiRequest('/RechargeWeiXinPay/createRechargeorder', 'POST', {
        'member_id': member_id,
        'openid': opendid,
        'order_price': amount,
        'id': id,
        'recharge_way': recharge_way,
        'address_id': address_id
      }, function (res) {
        console.log(res)
        if (res.status = 200) {
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
    var that =this
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id,
    }, function (res) {
      console.log(res.data[0])
      if (res.data[0] == null) {
        wx.showModal({
          content: '请先添加收货地址',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/mine/address/address',
              })
            }
          }, fail: function (res) {
            if (res.confirm) {
              // wx.switchTab({
              //   url: '/pages/home/home'
              // })
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