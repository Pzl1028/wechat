// pages/payorder/payorder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCheck: "W", //支付方式-默认微信支付
    payView: "none", //支付弹框
    user_password: null, //支付密码
    price: 0,
    user_price: 0,
    total_product: 0,
    num: 0,
    coupon: null,
    radio1: true,
    radio2: false,
    hasAddress: true,
    password: null,
    address: {},
    skuu: [],
    product_id: [],
    selectProduct: [],
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
        radioValue: 'W',
        name: '微信支付',
        value: 'W',
        image: '/img/paymart.png',
      },
      {
        radioValue: 'B',
        name: '余额支付',
        value: 'B',
        image: '/img/paybalance.png',
      },
    ],
    hintButton: "none",
    cus: [],
    Customstatus:true

  },
  //关闭支付警示窗口
  shutButton: function() {
    var that = this
    this.setData({
      hintButton: "none"
    })
  },
  // 选择支付方式
  radioChange: function(e) {
    console.log(e.detail.value)
    var payWay = e.detail.value
    wx.setStorageSync('payWay', payWay)
  },
  adders: function() {
    wx.navigateTo({
      url: '/pages/mine/addresss/addresss',
    })
  },
  // //选择支付方式
  // radioChoose: function(e) {
  //   var payWay = e.detail.value
  //   wx.setStorageSync('payWay', payWay)
  // },
  //使用优惠券
  useCoupons: function() {
    var that = this;
    var list = that.data.selectProduct[0].shop_cart_id;
    console.log(list)
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher?list=' + list
    })
  },

  //选择优惠券
  selectCoupons: function() {
    wx.navigateTo({
      url: '/pages/mine/voucher/voucher'
    })
  },
  //点击使用优惠券
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
    console.log("options")
    console.log(options)
    var that = this;
    wx.setStorageSync('selectCoupon', null)
    var selectProduct = wx.getStorageSync('selectProduct')
    that.setData({
      total_product: options.total,
      price: options.total,

    })

    //获取地址
    var member_id = options.memberId;
    console.log("memberId=" + member_id)

    console.log(selectProduct)
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': member_id
    }, function(res) {
      console.log(res)
      if (res.data[0] == null) {
        
        that.setData({
          hasAddress: false
        })
      } else {
        wx.setStorageSync('selectAdders', res.data["0"])
        that.setData({
          address: res.data["0"]
        })
      }
    });

    //购物车传值信息
    // var selectProduct = app.globalDate.selectProduct;
    var total = options.total;
    if (selectProduct == "") {
      that.setData({
        kordera: "none",
        krederb: "block"
      })
    }
    console.log(selectProduct)
    that.setData({
      selectProduct: selectProduct //商品信息
    });
    //结算页面接收数据
    var product_pricea = options.product_pricea;
    console.log(product_pricea)
    if (product_pricea != undefined) {
      that.setData({

      })

    }
    //身体尺寸信息
    // var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
   
    // var member_id = wx.getStorageSync('memberId')
    //获取优惠券
    app.apiRequest('/Exchange/getExchangeId', 'GET', {
        member_id: member_id
      },
      function(res) {
        console.log(res)
        if (res.data == "") {

        } else {
          wx.setStorageSync('couponList', res.data)
          that.setData({
            num: res.data.length
          })
        }
        // that.setData({
        //   voucher: res.data
        // })
      })
    //获余额信息
    app.apiRequest('/member/getbalance', 'GET', {
      'member_id': member_id
    }, function(resd) {
      console.log(resd.data)
      that.setData({
        user_price: resd.data.balance
      })
    })


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
    var that=this;

    console.log("进来了")
    
    var member_id = wx.getStorageSync('memberId')
    var selectCustom = wx.getStorageSync('selectCustom');
    console.log(selectCustom);
    if (selectCustom) {
      that.setData({
        cus: selectCustom,
        cus_status: true
      })
    } else {
      wx.request({
        url: 'https://www.pengyoujuhui.com/clothing/custom/findCustomByFlag',
        method: "post",
        data: {
          'memberId': wx.getStorageSync('memberId'),
          'flag': 1
        },
        // post请求  需要加这个 application/x-www-form-urlencoded   GET不需要
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 200) {
            that.setData({
              cus: res.data.data["0"].cus,
              cus_status:true
          })
            wx.setStorageSync('selectCustom', res.data.data["0"].cus)
          
          }else{
            that.setData({
            cus_status:false
          })
          }
        },
        fail: function (res) {

        }
      })
      // app.apiRequest('/custom/newCustom', 'GET', {
      //   'memberId': member_id,
      //   'state': 1
      // }, function (res) {
      //   console.log("res")
      //   console.log(res);
      //   console.log(res.data)
      //   if (res.code == 200) {
      //     that.setData({
      //       cus: res.data.cus[0],
      //       cus_status:true
      //     })
      //     wx.setStorageSync('selectCustom', res.data.cus[0])
      //   }else{
      //     that.setData({
      //       cus_status:false
      //     })
      //   }
     
      // });
    }
    


    var address = wx.getStorageSync('selectAdders');
    if(address!=null){
      this.setData({
        address: address,
        coupon: wx.getStorageSync('selectCoupon')
      })
    }else{
      app.apiRequest('/address/getMemberAddress', 'GET', {
        'memberId': member_id
      }, function (res) {
        console.log(res)
        if (res.data[0] == null) {

          that.setData({
            hasAddress: false
          })
        } else {
          console.log("获取到地址")
          wx.setStorageSync('selectAdders', res.data["0"])
          that.setData({
            address: res.data["0"],
            hasAddress: true
          })
        }
      });
    }
    
    if (this.data.coupon != null) {
      var price = parseInt(parseInt(this.data.total_product).toFixed(2)) - parseInt(parseInt(this.data.coupon.discount_amount).toFixed(2))

      this.setData({
        price: ((parseFloat(this.data.total_product) * 1000 - parseFloat(this.data.coupon.discount_amount) * 1000) / 1000) > 0 ? ((parseFloat(this.data.total_product) * 1000 - parseFloat(this.data.coupon.discount_amount) * 1000) / 1000).toFixed(2) : 0.01
      })  
    }

  
    
  },


  onPay: function(e) {
    console.log(e)
    this.setData({
      payCheck: e.detail.value
    })
  },

  createOrder: function(e) {
    var that = this;
    var address = wx.getStorageSync('selectAdders');
    var selectProduct = wx.getStorageSync('selectProduct');
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    var memberId = wx.getStorageSync('memberId')
  //判断收货地址有无
  if(!that.data.hasAddress){
    wx.setStorageSync('isfalge', false);
    wx.showModal({
      content: '添加收货地址',
      success: function (res) {

        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/mine/address/address'
          })
        }else{
          
        }
      }
    })
    return;
  }else{
    console.log("有收货地址")
  }



  //判断量体信息
   if(that.data.cus_status){

   }else{
     wx.showModal({      
       content: '您还没有尺寸信息',
       confirmText: '去添加',
       cancelColor: '#4e7fa8',
       confirmColor: '#4e7fa8',
       success(res) {
         if (res.confirm) {
           wx.navigateTo({
             url: '../home/toorder/toorder',
           })
         } else if (res.cancel) {
           console.log('用户点击取消')

         }
       }
     })
     return;
   }
    
    
    
    console.log("Customstatus="+that.data.Customstatus)
    if (that.data.Customstatus){
    var brede_context = new Array(" ", " ", " ");
    console.log(memberId)
    //所有商品id数组集合
    var product_ids = new Array();
    for (var i = 0; i < selectProduct.length; i++) {
      product_ids.push(selectProduct[i].product_id);
    }
    console.log(product_ids)
    var amounts = new Array();
    for (var i = 0; i < selectProduct.length; i++) {
      amounts.push(selectProduct[i].product_amount);
    }
    console.log(amounts)
    var skuIds = new Array();
    //skuIds.push(selectProduct[i].sku);
    for (var i = 0; i < selectProduct.length; i++) {

      var sku = new Array();
      for (var j = 0; j < selectProduct[i].sku.length; j++) {
        sku.push(selectProduct[i].sku[j].sku_id + "");
      }
      skuIds.push(sku + "");
    }

    console.log(skuIds)
    var selectCoupon = wx.getStorageSync('selectCoupon')
     
    if (that.data.payCheck=="W"){
      wx.showLoading({
        title: '支付中...',
        mask: true
      })
        //微信支付
        if (selectCoupon != null) {
          wx.request({
            method: "POST",
            url: 'https://www.pengyoujuhui.com/clothing/wx/pay/createOrder',
            data: {
              openid: openid,
              member_id: memberId,
              address_id: address.address_id + "",
              product_ids: product_ids + "",
              amounts: amounts + "",
              // 'shopCartId': shop_cart_id + "",
              payWay: "w",
              BuyWay: "送货上门",
              message: "无",
              skuId: skuIds,
              custom_id: that.data.cus.id,
              brede_context: brede_context + "",
              ec_id: parseInt(selectCoupon.ec_id)
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res)
              var packagess = 'prepay_id=' + res.data.resultMap.prepayid
              console.log(packagess)
              wx.requestPayment({
                appId: res.data.resultMap.appid,
                timeStamp: res.data.resultMap.timestamp,
                nonceStr: res.data.resultMap.noncestr,
                package: packagess,
                signType: 'MD5',
                paySign: res.data.resultMap.sign,
                success(res) {
                  wx.hideLoading();
                  console.log(res)
                  if (res.errMsg == 'requestPayment:ok') {
                    that.delectprductlist();
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
                fail(res) {
                  console.log(res)
                  wx.hideLoading()
                }
              })
            },
            fail: function(res) {

            }
          })
        } else {
          wx.request({
            method: "POST",
            url: 'https://www.pengyoujuhui.com/clothing/wx/pay/createOrder',
            data: {
              openid: openid,
              member_id: memberId,
              address_id: address.address_id + "",
              product_ids: product_ids + "",
              amounts: amounts + "",
              // 'shopCartId': shop_cart_id + "",
              payWay: "w",
              BuyWay: "送货上门",
              message: "无",
              skuId: skuIds,
              custom_id: that.data.cus.id,
              brede_context: brede_context + ""
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res)
              var packagess = 'prepay_id=' + res.data.resultMap.prepayid
              console.log(packagess)
              wx.requestPayment({
                appId: res.data.resultMap.appid,
                timeStamp: res.data.resultMap.timestamp,
                nonceStr: res.data.resultMap.noncestr,
                package: packagess,
                signType: 'MD5',
                paySign: res.data.resultMap.sign,
                success(res) {
                  console.log(res)
                  wx.hideLoading();
                  if (res.errMsg == 'requestPayment:ok') {
                    that.delectprductlist();
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
                fail(res) {
                  console.log(res)
                  wx.hideLoading()
                }
              })
            },
            fail: function(res) {

            }
          })
        }
    }else{
      
      if (parseInt(parseInt(that.data.user_price).toFixed(0)) < parseInt(parseInt(that.data.price).toFixed(0))) {
        console.log("sss")
        wx.showModal({
          content: '余额不足,请充值！',
          confirmText: '去充值',
          
          cancelColor: '#4e7fa8',
          confirmColor: '#4e7fa8',
          success(res) {
            if (res.confirm) {
              
            } else if (res.cancel) {
              console.log('用户点击取消')

            }
          }
        })
        return;

        }

        //余额支付
        that.setData({
          payView:""
        })
      if (that.data.user_password!=null){
          if (that.data.user_password.length == 6) {
            console.log(that.data.user_password.length)
          } else {
            console.log(that.data.user_password)
            return;
          }
        
        }else{
        return;
        }
      


      if (selectCoupon != null) {
        wx.request({
          method: "POST",
          url: 'https://www.pengyoujuhui.com/clothing/wx/pay/createOrder',
          data: {
            openid: openid,
            member_id: memberId,
            address_id: address.address_id + "",
            product_ids: product_ids + "",
            amounts: amounts + "",
            // 'shopCartId': shop_cart_id + "",
            payWay: "B",
            BuyWay: "送货上门",
            message: "无",
            skuId: skuIds,
            custom_id: that.data.cus.id,
            brede_context: brede_context + "",
            ec_id: parseInt(selectCoupon.ec_id)
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            wx.request({
              method: "POST",
              url: 'https://www.pengyoujuhui.com/clothing/wx/balance/balanceNotify',
              data: {
                out_trade_no: res.data.orderNum,
                member_id: memberId,
                pay_password: that.data.user_password
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                
                console.log(res)
                if (res.data.msg == "success" && res.data.status == 200) {
                  console.log("没有用优惠券支付成功")
                  that.delectprductlist();
                }
              },
              fail: function (res) {
                console.log(res)

              }
            })
          },
          fail: function (res) {

          }
        })
      } else {
         console.log("没有有优惠券余额支付")
        wx.request({
          method: "POST",
          url: 'https://www.pengyoujuhui.com/clothing/wx/pay/createOrder',
          data: {
            openid: openid,
            member_id: memberId,
            address_id: address.address_id + "",
            product_ids: product_ids + "",
            amounts: amounts + "",
            // 'shopCartId': shop_cart_id + "",
            payWay: "B",
            BuyWay: "送货上门",
            message: "无",
            skuId: skuIds,
            custom_id: that.data.cus.id,
            brede_context: brede_context + ""
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            wx.request({
              method:"POST",
              url: 'https://www.pengyoujuhui.com/clothing/wx/balance/balanceNotify',
              data:{
                out_trade_no: res.data.orderNum,
                member_id: memberId,
                pay_password: that.data.user_password
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(res){
                console.log(res)
                
                if (res.data.msg == "success" && res.data.status == 200) {
                  console.log("没有用优惠券支付成功")
                  that.delectprductlist();
                }
              },
              fail:function(res){
                console.log(res)
              }
            })
          },
          fail: function (res) {

          }
        })
      }
    }
    } else {
      return;
    }
  },



  // 生成订单
  tijiaodd: function(e) {
    var that = this
    // var ec_id = this.data.ec_id;
    // if (ec_id == undefined) {
    //   ec_id = ""
    // }
    // console.log(ec_id)
    var address_id = this.data.address.address_id; //地址id 
    var member_id = wx.getStorageSync('memberId'); //用户id
    var product_id = that.data.product_id;
    var skuu = that.data.skuu;
    var product_amount = "1";
    var pw = wx.getStorageSync('payWay')
    console.log("product_id")
    console.log(product_id)
    console.log("address_id")
    console.log(address_id)
    console.log("skuu")
    console.log(skuu)
    console.log("wx.getStorageSync('openid')")
    console.log(wx.getStorageSync('openid'))
    console.log(wx.getStorageSync('memberId'))
    var shop_cart_id = ""
    var aaa = "W"
    var bbb = "B"
    var BuyWay = '送货上门'

    console.log(pw)
    if (pw == "") {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 1000
      });
    } else if (pw == aaa) { //微信
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
        'skuId': skuu + "",
      }, function(res) {
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
            'success': function(res) {
              if (res.errMsg == 'requestPayment:ok') {
                that.delectprductlist();
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
            'fail': function(res) {
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
    } else if (pw == bbb) { //余额
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
        'skuId': skuu + "",
        // 'ec_id': ec_id
      }, function(res) {
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
  //余额支付
  qurren: function(e) {
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
    }, function(res) {
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
          success: function(res) {
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

    })
  },
  passworda: function(e) {
    this.setData({
      user_password: e.detail.value
    })
  },
  //关闭弹出层
  guanbi: function() {
    var that = this
    that.setData({
      payView: "none"
    })
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

  },
  delectprductlist: function () {
    var productlist = wx.getStorageSync('selectProduct');
    let ids = [];
    for (var i = 0; i < productlist.length; i++) {
      ids.push(productlist[i].shop_cart_id)
    }
    app.apiRequest('/shopCart/deleteMemberShopCartIds', 'GET', {
      shopCartIds: ids + "",
    }, function (res) {
      wx.setStorageSync('selectProduct', '')
    })

  }
})