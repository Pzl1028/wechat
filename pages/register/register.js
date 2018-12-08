// pages/register/register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: null,
    password: null,
    passwordq:null,
    code:null,
    disabled: true,
    timer: '', //定时器名字
    countDownNum: '60' //倒计时初始值
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
  passwordq: function (e) {
    this.setData({
      passwordq: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode:function(){
    var that =this
    var accounts = this.data.accounts
    if (accounts == null){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      });
      return
    }
    app.apiRequest('/member/register/code', 'POST',
      {
        'mobile': accounts
      }, function (res) {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '验证码获取成功',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            disabled: false
          })
          that.countDown();
          setTimeout(function () {
            that.setData({
              disabled: true
            })
          }, 60000)

          console.log('验证码', res.data)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1500
          });
        }
      })
  },
  register:function(){
    var accounts = this.data.accounts
    var password = null
    var code = this.data.code
    if (this.data.password == this.data.passwordq){
      password = this.data.password
    }
    this.memberRegister(accounts, password, code)
  },
  memberRegister(accounts, password, code){
    app.apiRequest('/member/memberRegister', 'POST',
      {
        'mobile': accounts,
        'password': password,
        'code': code
      }, function (res) {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }, 2000)
          console.log('注册成功', res.data)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1500
          });
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  }
})