// pages/login/login.js
var app = getApp()
Page({ 
  /**
   * 页面的初始数据
   */ 
  data: {
    accounts: null,
    password: null,
    session_key:null,
    auoth_user:false,
    phone:false
  },
 
  accounts: function (e) {
    this.setData({
      accounts: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  memberlogin(accounts, password){
    // console.log(password)
    var asd=password
    wx.setStorageSync("asd", asd)

    if (accounts == null || password == null) {     
      wx.showToast({
        title: '请输入账号密码',
        icon: 'none',
        duration: 1500
      });
      return
    }
    var asas = wx.getStorageSync('unionid')
    app.apiRequest('/member/memberLogin','POST',
    {
      'mobile': accounts,
      'password': password,
      'unionid': asas
      }, function (res) {
        console.log(res)
        console.log(res.data)
        if (res.code == 200) {
          // app.apiRequest('/Exchange/newCoupons', 'GET', {
          //   member_id: res.data.member_id
          // }, function (resdd) {
          //   console.log(resdd.code) 
          //   console.log(resdd.data)
          //   if(resdd.data ==""){
          //     app.apiRequest('/Exchange/newCoupons', 'GET', {
          //     },function(resq){
          //       console.log(resq.data[0].ec_id)
          //       console.log(resq.data[1].ec_id)
          //       console.log(resq.data[2].ec_id)
          //       var aw = resq.data[0].ec_id
          //       var ae = resq.data[1].ec_id
          //       var ar = resq.data[2].ec_id
          //       let ec =[]
          //       if(aw !=0){
          //         ec.push(aw);
          //       }
          //       if(ae != 0){
          //         ec.push(ae);
          //       }
          //       if (ar !=0){
          //         ec.push(ar);
          //       }
          //       console.log(ec)
          //       var asas = ec
          //       // console.log(asas)
          //       wx.setStorageSync("asas", asas)
          //       if(resq.data !=""){
          //         var asas = wx.getStorageSync('asas')
          //         console.log(asas)
          //         app.apiRequest('/Exchange/updateMember','POST',{ //领取红包
          //           'ecids':asas +"",
          //           'member_id': res.data.member_id
          //         },function(resw){
          //           console.log(res.code)
          //           console.log(res.data)
          //         })
          //       }
          //     })
          //   }else{
          //     // let rwsqwer= "1"
          //     // console.log(rwsqwer)
          //     // wx.setStorageSync("rwsqwer", rwsqwer) 
          //   }           
          // })
          console.log('登陆成功',res.data)
          wx.setStorageSync("memberId", res.data.member_id)
          wx.setStorageSync("mobile", res.data.mobile)
          wx.setStorageSync("password", res.data.password)
          wx.setStorageSync("balance", res.data.balance)
          wx.setStorageSync("nick_name", res.data.nick_name)
          wx.setStorageSync("session_key", res.data.session_key)
          setTimeout(function () {
            wx.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 1000
            });
            // wx.switchTab({
            //   url: '../home/home',
            // })
          }, 1500)
        } else {
          wx.showToast({
            title: "登录失败",
            icon: 'none',
            duration: 1500
          });
        }
      });
      
    // var member_id = wx.getStorageSync('memberId') 
    // console.log(member_id)
    // app.apiRequest('/Exchange/newCoupons','GET',{
    //   member_id: member_id
    // },function(resdd){
    //     console.log(resdd.code)
    //     console.log(resdd.data)
    // })


  },


  denglu:function(){
      this.memberlogin(this.data.accounts, this.data.password)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var phone = wx.getStorageSync('phone');
    var unionid = wx.getStorageSync('unionid');
    if(phone!=""&&unionid!=""){
      wx.switchTab({
          url: '../home/home',
        })
    }
    
  //  wx.login({
  //    //获取code
  //    success:function(res){
  //      if (res.code) {
  //          //登录成功存在缓存里面
  //          wx.setStorageSync("code", res.code)
  //          console.log(res.code)
  //           wx.request({
  //             url: 'https://www.pengyoujuhui.com/clothing/member/getOpenId',
  //             method:"POST",
  //             data:{
  //               'code': res.code
  //             },
  //             header: {
  //               'content-type': 'application/x-www-form-urlencoded'
  //             },
  //             success:function(res){
  //                   console.log(res.data.session_key);
  //                   that.setData({
  //                     session_key: res.data.session_key
  //                   })
  //               console.log(that.data);
  //             },
  //             fail:function(res){

  //             }
  //           })
          
        //  wx.request({
        //    url: 'http://192.168.1.7:9951/wxInfo/getUserInfo',
        //    method: "POST",
        //    data: {
        //      'code': res.code,
        //      'custom_id':""
        //    },
        //    header: {
        //      'content-type': 'application/x-www-form-urlencoded'
        //    },
        //    success: function (res) {
        //      console.log(res.data);
             
            
        //    },
        //    fail: function (res) {

        //    }
        //  })


  //      } else {
  //        console.log('获取用户登录态失败！' + res.errMsg)
  //      }
  //    }
  //  });
    // var mobile = wx.getStorageSync('mobile')
    // var asd = wx.getStorageSync('asd')
    // var unionid = wx.getStorageSync('unionid')
    // var phone = wx.getStorageSync('phone')
    // app.apiRequest('/member/memberLogin', 'POST', {
    //   'mobile': mobile,
    //   'password': asd
    // }, function (res) {
    //   if (res.code == 200) {
    //     wx.switchTab({
    //       url: '../home/home',
    //     })
    //   }
    // });


    // app.apiRequest('/member/wxmember', 'POST', {
    //   'mobile': phone,
    //   'unionid': unionid
    // }, function (res) {
    //   if (res.code == 200) {
    //     wx.switchTab({
    //       url: '../home/home',
    //     })
    //   }
    // })
  },

  getuser:function(res){
    var that=this;
    var encryptedData = res.detail.encryptedData;
    var iv = res.detail.iv;
    var phone = wx.getStorageSync('phone');
    wx.login({
     //获取code
     success:function(res){
       if (res.code) {
           //登录成功存在缓存里面
           console.log("sss")
           //wx.setStorageSync("code", res.code)
           console.log("code="+res.code)
            wx.request({
              url: 'https://www.pengyoujuhui.com/clothing/member/getOpenId',
              method:"POST",
              data:{
                'code': res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(res){
                    console.log("反回了");
                    console.log(res.data.session_key);
                    that.setData({
                      session_key: res.data.session_key
                    })
                console.log(that.data);
                var sess = that.data.session_key;
                wx.request({
                  url: 'https://www.pengyoujuhui.com/clothing/wxInfo/deciphering',
                  data: {
                    encrypdata: encryptedData,
                    ivdata: iv,
                    sessionkey: sess
                  },
                  success: function (res) {
                    console.log(res);
                    wx.setStorageSync("unionid", res.data.data.unionId);
                    that.setData({
                      auoth_user: false
                    })
                    if(phone==""){
                      that.setData({
                        phone: true
                      }) 
                    }else{
                      wx.switchTab({
                        url: '../home/home',
                      })
                    }
                  }
                })
              },
              fail:function(res){
                  console.log(res)
              }
            })
       }
      }
    })

    console.log(res);
    
  },

getPhoneNumber:function(e){
  var that=this;
  wx.login({
    //获取code
    success: function (res) {
      if (res.code) {
        //登录成功存在缓存里面
        console.log("code=" + res.code)
        wx.request({
          url: 'https://www.pengyoujuhui.com/clothing/member/getOpenId',
          method: "POST",
          data: {
            'code': res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            var sess = res.data.session_key;
            console.log("sess="+sess)
            wx.checkSession({
              success: function (res) {
                var unionid = wx.getStorageSync('unionid');
                var ency = e.detail.encryptedData;
                var iv = e.detail.iv;
                console.log("ency=" + ency);
                console.log("iv=" + iv);
                console.log("sess=" + sess)
                if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
                  that.setData({
                    modalstatus: true
                  });
                } else {
                  wx.request({
                    method: "POST",
                    url: 'https://www.pengyoujuhui.com/clothing/wxInfo/deciphering',
                    //url: 'http://192.168.1.7:9951/wxInfo/deciphering',
                    data: {
                      encrypdata: ency,
                      ivdata: iv,
                      sessionkey: sess
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: (res) => {
                      console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
                      console.log(res);
                      var phone = res.data.data.phoneNumber;
                      console.log(phone);
                      wx.setStorageSync('mobile', phone)
                      wx.setStorageSync('phone', phone)
                      that.setData({
                        phone:false
                      })
                      if(unionid!=""){
                            app.apiRequest('/member/wxmember', 'POST', {
                                'mobile': phone,
                                'unionid': unionid
                              }, function (res) {
                                console.log("手机号信息")
                                console.log(res.code)
                                // if (res.code == 202) {
                                //   wx.showToast({
                                //     title: '亲，已注册账号请用手机号登录',
                                //     icon: 'none',
                                //     duration: 1000
                                //   });
                                // }
                                if (res.code == 200) {
                                  console.log(res.data)
                                  wx.setStorageSync('memberId', res.data)
                                  // console.log(res.data)
                                  wx.switchTab({
                                    url: '../home/home',
                                  })
                                }
                              })
                      }else{
                        that.setData({
                          auoth_user: true
                        })
                      }
                    

                    }, fail: function (res) {
                      console.log("解密失败~~~~~~~~~~~~~");
                      console.log(res);
                      wx.showToast({
                        title: '亲，请先关注微信公众号（双鱼裁缝），再进行微信授权登录',
                        icon: 'none',
                        duration: 1000
                      });
                    }
                  });
                }
              }, fail: function () {
                console.log("session_key 已经失效，需要重新执行登录流程");
                that.wxlogin(); //重新登录
              }
            })
          },
          fail:function(res){

          }
        })
      }else{
        //发起登录失败
      }
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
    var that = this;
    var phone = wx.getStorageSync('phone');
    var unionid = wx.getStorageSync('unionid');
    if (phone == "") {
      this.setData({
        phone: true
      })
    }

    if (unionid == "") {
      this.setData({
        auoth_user: true
      })
    }

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(res);
          wx.getUserInfo({
            success: function (res) {
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              wx.setStorageSync("userInfo", res.userInfo)
              console.log(res);
              console.log("unionid=" + unionid)
              if (unionid == "") {
                wx.login({
                  //获取code
                  success: function (res) {
                    console.log("sss1")
                    if (res.code) {
                      //登录成功存在缓存里面
                      wx.setStorageSync("code", code)
                      console.log(res.code)
                      wx.request({
                        url: 'https://www.pengyoujuhui.com/clothing/member/getOpenId',
                        method: "POST",
                        data: {
                          'code': res.code
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                          console.log(res.data.session_key);
                          that.setData({
                            session_key: res.data.session_key
                          })
                          console.log("res.data.session_key" + res.data.session_key);
                          wx.request({
                            url: 'https://www.pengyoujuhui.com/clothing/wxInfo/deciphering',
                            data: {
                              encrypdata: encryptedData,
                              ivdata: iv,
                              sessionkey: res.data.session_key
                            },
                            success: function (res) {
                              console.log("unnid==" + res.data.data.unionId);
                              //wx.setStorageSync("unionid", res.data.data.unionId)
                            }
                          })

                        },
                        fail: function (res) {

                        }
                      })
                    } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                    }
                    var code = res.code; //微信返回的code
                    console.log("微信返回的code");
                    console.log(code)
                  }
                })
              } else {
                //有unionid

                console.log("unionid=" + unionid)
                that.setData({
                  auoth_user:false
                })
                console.log("phone=" + phone)
                if (phone != "") {
                  wx.switchTab({
                    url: '../home/home',
                  })
                } else {
                  console.log("手机号是空")
                  wx.showToast({
                    title: '请授权手机号',
                  })
                }
              }
            }
          })
        } else {


        }
      },
      fail: function (res) {
        console.log("res");
      }
    })
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
  return{
    title:"",
    desc:"",
    path:"/pages/home/home"
  }
  }
})