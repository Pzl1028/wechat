// pages/mine/size/mysize/mysize.js
  var app = getApp();
Page({
  // checkCustom:function(e){
  //   app.apirequest('/custom/findCustomByFlag','POST',{
  //     'memberId':wx.getStorageSync('memberId'),
  //     'flag':e.flag
  //   },function(res){
  //       var customList=res.data;      
  //   })
  // },
  /**
   * 页面的初始数据
   */
  data: {
     mysize:null
  },


  checkCustom: function (e) {
    var that =this;
    //console.log(wx.getStorageSync('memberId'));
      wx.request({
        url: 'https://www.pengyoujuhui.com/clothing/custom/findCustomByFlag',
        method:"post",
        data:{
          'memberId': wx.getStorageSync('memberId'),
          'flag': 1
        },
        // post请求  需要加这个 application/x-www-form-urlencoded   GET不需要
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data)
          if(res.data.code==200){
            that.setData({
              mysize:res.data.data
            })
            console.log(that.data.mysize);
          }
        },
        fail:function(res){
          
        }

      })
  },

  delectmysize:function(e){
    console.log("id为："+e.currentTarget.dataset.size.id)
    wx.request({
      url:'https://www.pengyoujuhui.com/clothing/custom/deleteCustomById',
      method:'POST',
      data:{
        'id': e.currentTarget.dataset.size.id
        },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(JSON.stringify(res));
        if(res.data.code == 200){
          setTimeout(function(){
            wx.showToast({
              title: '删除成功!'
            })
          },1000)
          wx.redirectTo({
            url: '/pages/mine/size/mysize/mysize',
          })
        }else{
            wx.showToast({
              title: '删除失败！',
              icon: 'none'
            })
        }
      }
    })
  },
 
  updatamyseize:function(e){
    console.log(e.currentTarget.dataset.size);
    wx.navigateTo({
      url: '../../home/toorder/toorder?id=' + e.currentTarget.dataset.size.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.checkCustom();
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