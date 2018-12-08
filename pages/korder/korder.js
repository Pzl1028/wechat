// pages/korder/korder.js
var app =getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    hasAddress: true,
    password: null, 
    address: {},
    selected_list:[],
    qweqwe:"block",
    total: '',
    asdasd:"none",
    product: {}, 
    kordera:"block",
    korderaa:"none",
    korderb:"none",
    discount:0,
    selectAllStatus: true,
    payWay:"",
    cartss:[
      { idasd: 'W', name: '微信支付', value: 'W', image: '/img/paymart.png', },
      { idasd:'B', name: '余额支付',value:'B', image: '/img/paybalance.png',},
    ],
    iasasd:'none'
  },
  passworda: function (e) {
    this.setData({
      passworda: e.detail.value
    })
  },
  //关闭弹出层
  guanbi:function(){
    var that=this
    that.setData({
      iasasd:"none"
    })
  },
  // 选择支付方式
  radioChange: function (e) {
    console.log(e.detail.value)
    var payWay = e.detail.value
    this.setData({
      payWay: payWay
    })
    // wx.setStorageSync('payWay', payWay)
  },
  // 点击使用优惠劵
  useCoupons:function(){
    var that= this
    var list = that.data.selected_list[0].shop_cart_id; 
    console.log(list)
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher?list=' + list  
    })
    // wx.navigateTo({
    //   url: '/pages/mine/voucher/voucher?list' + list
    // })
  },
  useCoupon: function () {
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
  onLoad: function (options) {
    var that = this;
    //获取地址
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id,
    }, function (res) {
      console.log(res.data[0])
      if(res.data[0] == null){
        wx.showModal({
          content: '请先添加收货地址',
          success: function () {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/mine/address/address'
              })
            }
          }, fail: function (res) {
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
      } else{
        that.setData({
          address: res.data[0]
        })
      }
    });
    // 购物车传值信息     
    var selected_list = app.globalData.selected_list;
    // console.log(selected_list)
    // console.log(selected_list[0].shop_cart_id)
    var total = options.total; //总价
    if (selected_list ==""){
      that.setData({
          kordera:"none",
          korderb:"block"
      })
    }
    console.log(selected_list)
    that.setData({
      selected_list:selected_list,//商品信息
      // shop_cart_id: selected_list[0].shop_cart_id
      // total: total,//总价
    });
     //订单页面接受数据
    var product_pricea = options.product_pricea;
    console.log(product_pricea)
    if (product_pricea !== undefined){
      that.setData({
        asdasd:"block",
        qweqwe:"none",
        kordera:"none",
        korderaa:"block",
      })
    }
    if (product_pricea < 299){
      that.setData({
        kordera:"none",
        korderb:"block"
      })
    }
   
    // console.log(ec_id)
    // console.log(discount_amount)
    var product_name = options.product_name;
    var product_icon = options.product_icon;
    var product_amount = options.amount;
    var product_id =options.product_id;
    var total = options.order_price;  //订单传递总价
    that.setData({
      product_pricea: product_pricea,
      product_name: product_name,
      product_icon: product_icon,
      product_amount: product_amount,
      product_id: product_id,
      // selected: selected,//商品信息
      // total: total,//总价
    })
    var ec_id = options.ec_id;
    console.log(ec_id)
    var discount_amount = options.discount_amount;
    that.setData({
      discount: discount_amount
    })
    // var total = options.total; //购物车总价
    // var total = options.order_price;  //订单传递总价
    if (options.total !==undefined){
      var totala = options.total;
      wx.setStorageSync("totala", totala)
      console.log(totala)
    } else if (options.order_price !==undefined){
      var totala = options.order_price;
      wx.setStorageSync("totala", totala)
    }
    console.log(totala)
    var totala = wx.getStorageSync('totala')
    var a = discount_amount

    console.log(a)
    if(a ==undefined){
      var total =totala;
      that.setData({
        total:total
      })
    } else if(a !==undefined){
      var  b=totala
      console.log(b)
        var total =b-a
        console.log(total)
        that.setData({
          total: total,
          ec_id:ec_id
        })
      }
   
    // console.log(that.data.selected_list)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.onLoad()
    console.info(options)
  },
    // 生成订单
  tijiaodd: function (e) {
   
      var that =this
    var ec_id = this.data.ec_id;
    if(ec_id == undefined){
       ec_id=""
    }
    console.log(ec_id)
      var address_id = this.data.address.address_id;  //地址id
    console.log(address_id)
      var member_id = wx.getStorageSync('memberId'); //用户id
      var list = this.data.selected_list;  //
      console.log(list)
    if (list == undefined){         //判断购物车是否有传过来值
        var product_id = that.data.product_id;
        var product_amount = that.data.product_amount;
        var shop_cart_id =""
      } else{
        var shop_cart_id=[];
        var product_id = [];//商品id
        var product_amount = []; //商品数量
        for (var i = 0, l = list.length; i < l; i++) {
          product_id.push(list[i].product_id);
          product_amount.push(list[i].product_amount);
          shop_cart_id.push(list[i].shop_cart_id);
        }
      }

    // console.log(product_amount)
    // console.log(shop_cart_id)
    // console.log(product_id)
    
    var aaa="W"
    var bbb ="B"
    var BuyWay ='送货上门'
    var pw = that.data.payWay
    console.log(pw)
    // var pw = wx.getStorageSync('payWay')
    // console.log(pw)
    if(pw == ""){
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 1000
      });
    }else if(pw == aaa){
        app.apiRequest('/wx/pay/createOrder', 'POST', {
          'openid': wx.getStorageSync('openid'),
          'member_id': wx.getStorageSync('memberId'),
          'address_id': address_id,
          'product_ids': product_id + "",
          'amounts': product_amount + "",
          'shopCartId': shop_cart_id +"",
          'payWay': pw,
          'BuyWay': '送货上门',
          'message': "无",
          'skuId': +"",
          'ec_id':ec_id
        }, function (res) {
          console.log(res+"res打印")
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
            console.log(timestamp)
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
    }else if(pw ==bbb){
          // console.log(pw)
    // console.log(product_amount)
    console.log(wx.getStorageSync('openid'))
    console.log(wx.getStorageSync('memberId'))
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
      'skuId': +"",
      'ec_id': ec_id
    }, function (res) {
      console.log(res)
      // console.log(res.data.out_trade_no)
      // console.log(res.data.pay_passwordIsExist)
      if (res.status = 200) {
        that.setData({
          iasasd: "block"
        });
        var zhi = res.resultMap
        wx.setStorageSync('out_trade_no', res.orderNum)
        // that.zhifu(zhi.timestamp, zhi.noncestr, zhi.prepayid, zhi.sign)
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
        })
      }
    })
    }
  },

  // 余额支付
  qurren:function(e){
   var that =this
    var passworda = this.data.passworda
    console.log(passworda)
    var out_trade_no = wx.getStorageSync('out_trade_no')
    console.log(out_trade_no)
    var memberId = wx.getStorageSync('memberId')
    console.log(memberId)
    app.apiRequest('/wx/balance/balanceNotify','POST',{
      'out_trade_no': out_trade_no,
      'member_id': memberId,
      // 'pay_password': passworda
    },function(res){
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      if(res.status ==303){
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/home/home',
        })

      }else if(res.status ==402){
        wx.showToast({
          title: '余额支付失败，请使用微信支付',
          icon: 'none',
          duration: 2000
        })
      }
      if(res.status ==506){
        wx.showModal({
          title: '余额不足请充值，或使用微信支付',
         success:function(res){
           if(res.confirm){
             wx.switchTab({
               url: '/pages/home/home',
             })
           }else if(res.cancel){
             wx.switchTab({
               url: '/pages/home/home',
             })
           }
         }
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