package config

import (
	"fmt"
	"os"
)


func GetEnv(key string) (string,error){
	value := os.Getenv(key)
	if value == "" {
		return "",  fmt.Errorf("environment variable %s not set", key)
	}

	return value, nil
}
