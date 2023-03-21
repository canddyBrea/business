package conf

import (
	"fmt"

	"github.com/spf13/viper"
)

func InitConfig() {
	viper.SetConfigName("settings")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./conf/")
	err := viper.ReadInConfig()
	if err != nil {
		panic("init load config file error " + err.Error())
	}

	fmt.Println(viper.GetString("server.port"))
}
