// pages/mine/size/size.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "",
    name: "", height: "", weight: "", sex: "", breadthing: "",breadth:"", arm_length: "", hip_circumference: "", waist_circumference: "", chest:"",
    knee_circumference: "", long_legs: "", s_buttock_height: "", s_cross: "", s_cross_height: "", s_neck_girth: "", s_waist_height:"",
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    app.apiRequest('/custom/findCustomById', 'POST', {
      'id': member_id,
    }, function (res) {
      console.log("返回值")
      console.log(res.data)
      console.log(res.data.cus[0].sex)
      var asd = res.data.cus[0].sex
      if(asd ==1){
        var asdasd ="男"
      }
      if(asd ==2){
        var asdasd ="女"
      }
      that.setData({
        sex:asdasd,
        name: res.data.cus[0].name,
        height: res.data.cus[0].height,
        weight: res.data.cus[0].weight,
        breadthing: res.data.cus[0].s_neck_girth, //领围
        breadth: res.data.cus[0].breadth, //机器扫描肩宽
        arm_length: res.data.cus[0].arm_length, //臂长
        chest: res.data.cus[0].chest, //胸围
        waist_circumference: res.data.cus[0].waist_circumference, //腰围
        knee_circumference: res.data.cus[0].knee_circumference, //臀围
        // long_legs: res.data.cus[0].long_legs, //肩宽
        s_buttock_height: res.data.cus[0].s_buttock_height, //臀高
        s_cross: res.data.cus[0].s_cross,  //过肩横颈
        s_cross_height: res.data.cus[0].s_cross_height, //颈椎点高
        s_neck_girth: res.data.cus[0].s_neck_height,//颈围
        s_waist_height: res.data.cus[0].s_waist_height,  //腰高
      })
    });
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
        breadthing: res.data.cus[0].s_neck_girth, //领围
        breadth: res.data.cus[0].breadth, //机器扫描肩宽
        arm_length: res.data.cus[0].arm_length, //臂长
        hip_circumference: res.data.cus[0].hip_circumference, //胸围
        waist_circumference: res.data.cus[0].waist_circumference, //腰围
        knee_circumference: res.data.cus[0].knee_circumference, //臀围
        // long_legs: res.data.cus[0].long_legs, //肩宽
        s_buttock_height: res.data.cus[0].s_buttock_height, //臀高
        s_cross: res.data.cus[0].s_cross,  //过肩横颈
        s_cross_height: res.data.cus[0].s_cross_height, //颈椎点高
        s_neck_girth: res.data.cus[0].s_neck_height,//颈围
        s_waist_height: res.data.cus[0].s_waist_height,  //腰高
      })
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