// pages/mine/addresss/addresss.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        address:{},
        asdasd:"block",
        // asd:"none"
  },
  // 修改跳转
  modify: function (o) {
    var addressid = o.target.id
    wx.setStorageSync('addressid', addressid)
    wx.redirectTo({
      url: '/pages/mine/modifyaddres/modifyaddres',
    })
  },
  chooseAddress:function(res){
  wx.chooseAddress({
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  },
    // 删除地址
    sumit:function(o){
        var that = this
        var addressid = o.target.id
        console.log(addressid)
      var create_member_id = wx.getStorageSync('memberId')
      console.log(create_member_id)
      app.apiRequest('/address/deleteMemberAddress','POST',{
        'addressId': addressid
      },function(res){
        console.log(res.code)
        if(res.code ==200){
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          });
          app.apiRequest('/address/getMemberAddress', 'GET',{
            'memberId': create_member_id
          },function(res){
            if (res.data[0] == undefined) {
              that.setData({
                asdasd: "none"
              })
            }else{
              that.setData({
                asdasd: "block"
              })
            }
            that.setData({
              address: res.data
            })
          })
        } else{
          wx.showToast({
            title: '删除失败！',
            icon: 'none'
          });
        }
      }
      
      )
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
    var create_member_id = wx.getStorageSync('memberId')
    console.log(create_member_id)
    app.apiRequest('/address/getMemberAddress','GET',{
      'memberId': create_member_id
    },function(res){
      // console.log(res.lenght)
      console.log(res.data[0])
      if(res.data[0] ==undefined){
        that.setData({
          asdasd:"none"
        })
      }else{
        that.setData({
          asdasd: "block"
        })
      }
      that.setData({
        address: res.data       
      })
    }
    )
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
    this.onLoad();
    var that = this
    var create_member_id = wx.getStorageSync('memberId')
    console.log(create_member_id)
    app.apiRequest('/address/getMemberAddress', 'GET', {
      'memberId': create_member_id
    }, function (res) {
      console.log(res.data)
      if (res.data[0] == undefined) {
        that.setData({
          asdasd: "none"
        })
      }else{
        that.setData({
          asdasd: "block"
        })
      }
      that.setData({
        address: res.data

      })
    }
    )
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