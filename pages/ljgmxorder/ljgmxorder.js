// pages/korder/korder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAddress: true,
    password: null,
    address: {},
    skuu: [],
    product_id:"",
    selected_list:{},
    qweqwe: "block",
    total: '',
    asdasd: "none",
    product: {},
    size:"",
    name: "", height: "", weight: "", sex: "", breadth: "", arm_length: "", hip_circumference: "", waist_circumference: "",
    knee_circumference: "", long_legs: "", s_buttock_height: "", s_cross: "", s_cross_height: "", s_neck_girth: "", s_waist_height: "",
    kordera: "block",
    korderb: "none",
    discount: 0,
    selectAllStatus: true,
    cartss: [
      { idasd: 'W', name: '微信支付', value: 'W', image: '/img/paymart.png', },
      { idasd: 'B', name: '余额支付', value: 'B', image: '/img/paybalance.png', },
    ],
    iasasd: 'none'
  },
  passworda: function (e) {
    this.setData({
      passworda: e.detail.value
    })
  },
  //关闭弹出层
  guanbi: function () {
    var that = this
    that.setData({
      iasasd: "none"
    })
  },
  // 选择支付方式
  radioChange: function (e) {
    console.log(e.detail.value)
    var payWay = e.detail.value
    wx.setStorageSync('payWay', payWay)
  },
  // 点击使用优惠劵
  useCoupons: function (e) {
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //var skuu = app.globalData.skuu;
    var skuu=97;
    console.log(skuu)
    //var  product_id =app.globalData.product_id
    var product_id = 97;
    that.setData({
      product_id: product_id,
      skuu: skuu
    })
    app.apiRequest('/product/getProduct','GET',{
      'productId': product_id
    },function(res){
      console.log(res.data)
      console.log(res.data[0].product_price)
      that.setData({
        selected_list:res.data,
        total: res.data[0].product_price

      })
    })
    //获取地址
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id,
    }, function (res) {
      console.log(res.data[0])
      if (res.data[0] == null) {
        // wx.showModal({
        //   title: '亲，请先添加收货地址',
        //   success: function (res) {
        //     if (res.confirm) {
        //       wx.navigateTo({ url: '/pages/mine/address/address', })
        //     } else if (res.cancel) {
        //       wx.navigateTo({ url: '/pages/mine/address/address', })
        //     }
        //   }
        // });
        that.setData({
          hasAddress: false
        })
      } else {
        that.setData({
          address: res.data[0]
        })
      }
    });
    //身体尺寸信息
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/custom/newCustom', 'GET', {
      'memberId': member_id,
      'state': 1
    }, function (res) {
      console.log(res.data)
      console.log(res.data.cus[0].sex)
      var asd = res.data.cus[0].sex
      if (asd == 1) {
        var asdasd = "男"
      }
      if (asd == 2) {
        var asdasd = "女"
      }
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
    });

    // console.log(that.data.selected_list)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.onLoad()
    console.info(options)
    var that =this
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id,
    }, function (res) {
      console.log(res.data[0])
      if (res.data[0] == null) {
        // wx.showModal({
        //   title: '亲，请先添加收货地址',
        //   success: function (res) {
        //     if (res.confirm) {
        //       wx.navigateTo({ url: '/pages/mine/address/address', })
        //     } else if (res.cancel) {
        //       wx.navigateTo({ url: '/pages/mine/address/address', })
        //     }
        //   }
        // });
        that.setData({
          hasAddress: false
        })
      } else {
        that.setData({
          hasAddress: true,
          address: res.data[0]
        })
      }
    });
  },
  // 生成订单
  tijiaodd: function (e) {
    var that = this
    // var ec_id = this.data.ec_id;
    // if (ec_id == undefined) {
    //   ec_id = ""
    // }
    // console.log(ec_id)
    var address_id = this.data.address.address_id;  //地址id 
    var member_id = wx.getStorageSync('memberId'); //用户id
    var product_id = that.data.product_id;
    var skuu =that.data.skuu;
    var product_amount = "1";
    console.log(product_id)
    console.log(address_id)
    console.log(skuu)
    console.log(wx.getStorageSync('openid'))
    console.log(wx.getStorageSync('memberId')) 
    var shop_cart_id = ""
    var aaa = "W"
    var bbb = "B"
    var BuyWay = '送货上门'
    var pw = wx.getStorageSync('payWay')
    console.log(pw)
    if (pw == "") {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 1000 
      });
    } else if (pw == aaa) {  //微信
      app.apiRequest('/wx/pay/createOrder', 'POST', {
        'openid': wx.getStorageSync('openid'),
        'member_id': wx.getStorageSync('memberId'),
        'address_id': address_id,
        'product_ids': product_id + "",
        'amounts': product_amount + "",
        // 'shopCartId': shop_cart_id + "",
        'payWay': pw,
        'BuyWay': '送货上门',
        'message': "无",
        'skuId': skuu+"",
      }, function (res) {
          console.log(res)
          if (res.status = 200) {
            var zhi = res.resultMap
            wx.setStorageSync('out_trade_no', res.orderNum)
            // that.zhifu(zhi.timestamp, zhi.noncestr, zhi.prepayid, zhi.sign)
            // wx.showToast({
            //   title: '订单生成成功',
            //   icon: 'none',
            //   duration: 1000
            // });
            var timestamp = res.resultMap.timestamp
            var noncestr = res.resultMap.noncestr
            var prepayid = res.resultMap.prepayid
            var sign = res.resultMap.sign
            var timestamp = res.resultMap.timestamp
            //微信支付
            // zhifu(timestamp, noncestr, prepayid, sign) {
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
            // }
          } else {
            wx.showToast({
              title: '订单生成失败',
              icon: 'none',
              duration: 1000
            });
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        })
    } else if (pw == bbb) {  //余额
      console.log(pw)
      console.log(product_amount)   
      app.apiRequest('/wx/pay/createOrder', 'POST', {
        'openid': wx.getStorageSync('openid'),
        'member_id': wx.getStorageSync('memberId'),
        'address_id': address_id,
        'product_ids': product_id + "",
        'amounts': product_amount + "",
        'shopCartId': shop_cart_id + "",
        'payWay': pw,
        'BuyWay': '送货上门',
        'message': "无",
        'skuId':skuu +"",
        // 'ec_id': ec_id
      }, function (res) {
        console.log(res)
        if (res.status = 200) {
          that.setData({
            iasasd: "block"
          });
          var zhi = res.resultMap
          wx.setStorageSync('out_trade_no', res.orderNum)
          // wx.showToast({
          //   title: '订单生成成功',
          //   icon: 'none',
          //   duration: 1000
          // })        
        } else {
          wx.showToast({
            title: '订单生成失败',
            icon: 'none',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      })
    }
  },

  // 微信支付
  // zhifu(timestamp, noncestr, prepayid, sign) {
  //   var out_trade_no = wx.getStorageSync('out_trade_no')
  //   app.apiRequest('/wx/balance/balancePay','POST',{
  //     'timeStamp': timestamp,
  //     'nonceStr': noncestr,
  //     'package': 'prepay_id=' + prepayid,
  //     'signType': 'MD5',
  //     'paySign': sign,
  //     // ''
  //   },)
  //   wx.requestPayment({
  //     'timeStamp': timestamp,
  //     'nonceStr': noncestr,
  //     'package': 'prepay_id=' + prepayid,
  //     'signType': 'MD5',
  //     'paySign': sign,
  //     'success': function (res) {
  //       if (res.errMsg == 'requestPayment:ok') {
  //         wx.showToast({
  //           title: '支付成功',
  //           icon: 'none',
  //           duration: 2000
  //         });
  //         wx.redirectTo({
  //           url: '/pages/home/home',
  //         })
  //       }
  //     },
  //     'fail': function (res) {
  //       wx.showToast({
  //         title: '支付失败！',
  //         icon: 'none',
  //         duration: 2000
  //       });
  //     }
  //   })
  // },
    //余额支付
  qurren: function (e) {
    var that = this
    var passworda = this.data.passworda
    console.log(passworda)
    var out_trade_no = wx.getStorageSync('out_trade_no')
    console.log(out_trade_no)
    var memberId = wx.getStorageSync('memberId')
    console.log(memberId)
    app.apiRequest('/wx/balance/balanceNotify', 'POST', {
      'out_trade_no': out_trade_no,
      'member_id': memberId,
      // 'pay_password': passworda
    }, function (res) {
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      if (res.status == 303) {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/home/home',
        })

      } else if (res.status == 402) {
        wx.showToast({
          title: '余额支付失败，请使用微信支付',
          icon: 'none',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
      if (res.status == 506) {
        wx.showModal({
          title: '余额不足请充值，或使用微信支付',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/home',
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          }
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
      // else if(res ==100){
      //   wx.showModal({
      //     title: '请选择商品',
      //     content: '',
      //   })
      // } else if(res ==110){
      //   wx.showModal({
      //     title: '请选择商品',
      //     content: '',
      //   })
      // }
      // if(res.code ==200){
      //   wx.showToast({
      //     title: '支付成功',
      //     icon: 'none',
      //     duration: 1000
      //   });
      //   wx.switchTab({
      //     url: '/pages/home/home',
      //   })
      // }else{
      //   wx.showToast({
      //     title: '支付失败',
      //     icon: 'none',
      //     duration: 1000
      //   });
      //   wx.switchTab({
      //     url: '/pages/home/home',
      //   })
      // }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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