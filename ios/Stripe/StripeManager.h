//
//  StripeManager.h
//  eDance
//
//  Created by highjump on 2020/11/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface StripeManager : NSObject

+ (id _Nonnull )shared;
- (NSString *)getCustomerId;

@end

NS_ASSUME_NONNULL_END
