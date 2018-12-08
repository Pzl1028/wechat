// pages/loginone/loginone.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // asdasd:"none",
  },
    // click:function(){
    //   wx.navigateTo({
    //     url: '/pages/loginonea/loginonea',
    //   })
    // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var mobile = wx.getStorageSync('mobile')
    var asd = wx.getStorageSync('asd')
    var unionid = wx.getStorageSync('unionid')
    var phone = wx.getStorageSync('phone')
    app.apiRequest('/member/memberLogin','POST',{
      'mobile': mobile,
      'password':asd
    },function(res){
      if(res.code ==200){
        wx.switchTab({
          url: '../home/home',
        })
      }
    });
    app.apiRequest('/member/wxmember', 'POST', {
      'mobile': phone,
      'unionid': unionid
    }, function (res) {
      if (res.code == 200) {
        wx.switchTab({
          url: '../home/home',
        })
      }
    })
    var member_id =wx.getStorageSync('memberId')
    console.log(member_id)
    if(member_id ==""){
      that.setData({
        asdasd:"block"
      })
    }
    // app.apiRequest('/Exchange/newCoupons','GET',{
    //   'memberId':member_id
    // },function(res){
    //   console.log(res.data)
    //   if(res.data ==""){
    //     that.setData({
    //       asdasd:"boclk"
    //     })
    //   }
    // })
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