// pages/brand/sizepage/sizepage.js
var app=getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    item:"",
    ace:"",
    acea:"",
    aceb:""
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  height: function (e) {
    this.setData({
      height: e.detail.value
    })
  },
  weight: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  sex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  breadth: function (e) {
    this.setData({
      breadth: e.detail.value
    })
  },
  arm_length: function (e) {
    this.setData({
      arm_length: e.detail.value
    })
  },
  hip_circumference: function (e) {
    this.setData({
      hip_circumference: e.detail.value
    })
  },
  waist_circumference: function (e) {
    this.setData({
      waist_circumference: e.detail.value
    })
  },
  knee_circumference: function (e) {
    this.setData({
      knee_circumference: e.detail.value
    })
  },
  long_legs: function (e) {
    this.setData({
      long_legs: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/custom/newCustom', 'GET', {
      'state': 1,
      'memberId': member_id
    },
      function (res) {
        console.log(res.data)
        if (res.code == 200) {
          that.setData({
            ace: res.data.cus[0].name,
            acea: res.data.cus[0].height,
            aceb: res.data.cus[0].weight
          })
        } else {
          that.setData({
            ace: "+ 添加尺寸"
          })
        }
      });
    
  },
  click:function(){
      var that =this
      var name = this.data.name
      var height = this.data.height
      console.log(height)
      var weight = this.data.weight
      var a = this.data.sex
      if (a == "男") {
        var sex = "1"
      } else {
        var sex = "2"
      }
      var breadth = this.data.breadth
      var arm_length = this.data.arm_length
      var hip_circumference = this.data.hip_circumference
      var hip_circumference = this.data.waist_circumference
      var knee_circumference = this.data.knee_circumference
      var long_legs = this.data.long_legs
      let memCustom =[]
    // var memCustom={
    //   'name': name,
    //   'height': height,
    //   'weight': weight,
    //   'sex': sex,
    //   'breadth': breadth,
    //   'arm_length': arm_length,
    //   'hip_circumference': hip_circumference,
    //   'hip_circumference': hip_circumference,
    //   'knee_circumference': knee_circumference,
    //   'long_legs': long_legs
    // }
    // console.log(memCustom)
    // app.apiRequest('/custom/modifyMemberCustom','POST',{
    //   'memCustom': memCustom
    // },function(resas){
    //     console.log(resas.code)
    //     if(res.code ==200){

    //     }
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
    var that = this
    var member_id = wx.getStorageSync('memberId');
    app.apiRequest('/custom/newCustom', 'GET', {
      'state': 1,
      'memberId': member_id
    },
      function (res) {
        console.log(res.data)
        if (res.code == 200) {
          that.setData({
            ace: res.data.cus[0].name,
            acea: res.data.cus[0].height,
            aceb: res.data.cus[0].weight
          })
        } else {
          that.setData({
            ace: "+ 添加尺寸"
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