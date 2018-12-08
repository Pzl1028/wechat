// pages/mine/modifyaddres/modifyaddres.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneAddress: [],
    consignee: '',
    consignee:{},
    phone: '',
    phone:{},
    detail: '', 
    detail:{},
    area: '',
    area:{}
  },

    // 用户点击取消
 sumit:function(){
   wx.navigateBack({
      delta: 1
    })
 },
  consignee: function (e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  detail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  area: function (e) {
    this.setData({
      area: e.detail.value
    })
  },

  submit: function () {

    var consignee = this.data.consignee
    var phone = this.data.phone
    var detail = this.data.detail
    var address_id = this.data.address_id
    console.log(address_id)
    var area = this.data.area
    var create_member_id = wx.getStorageSync('memberId')
    console.log(create_member_id)
    let address = {
      'memberId': create_member_id,
      'addressId': address_id,
      'consignee': consignee,
      'phone': phone,
      'area': area,
      'detail': detail,
      'ifDefault': 1
    }
    console.log(address)
    app.apiRequest('/address/modifyMemberShopCart', 'POST', {
      'address': JSON.stringify(address)
    },
      function (res) {
        console.log(res.code)
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '修改地址成功',
            icon: 'none',
            duration: 2000
          });
          wx.navigateBack({
            delta:1
          })         
        } else {
          wx.showToast({
            title: '修改地址失败',
            icon: 'none',
            duration: 2000
          });
        }
      })
  },
    // {"memberId": 3, "consignee": 1qwe, "address_id":6, "phone": 2, "area": 3, "detail": 4, "ifDefault"：2}
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this;
    var address_id = options.address_id;
    var area = options.area;
    var detail = options.detail;
    var phone = options.phone;
    var consignee = options.consignee;
    that.setData({
      address_id: address_id,
      area: area,
      detail: detail,
      phone: phone,
      consignee: consignee,
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